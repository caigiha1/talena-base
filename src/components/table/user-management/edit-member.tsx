import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ChevronDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils.ts";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command.tsx";
import { CheckIcon } from "@radix-ui/react-icons";
import { role } from "@/components/table/data/data.tsx";
import { DepartmentAPI } from "@/service/department";
import { useEffect, useState } from "react";
import {
  useGetDetailUser,
  useUpdateUserDetail,
} from "@/service/react-query-hooks.ts";
import { useQueryClient } from "@tanstack/react-query";
import { Icons } from "@/common/Icon.tsx";

type DepartmentType = {
  id: string;
  name: string;
  members_details: string[];
  created_at: string;
  updated_at: string;
};

type Props = {
  user_id: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const formSchema = z.object({
  email: z.string(),
  full_name: z.string(),
  department: z.string().optional(),
  role: z.string(),
});

const EditMember = (props: Props) => {
  const queryClient = useQueryClient();
  const [openDepartments, setOpenDepartments] = useState(false);
  const [openRoles, setOpenRoles] = useState(false);
  const { user_id, open, setOpen } = props;

  const [departmentSelected, setDepartmentSelected] = useState<
    DepartmentType[]
  >([]);

  const getListDepartments = async () => {
    try {
      const res = await DepartmentAPI.listDepartmentSelected();
      setDepartmentSelected(res?.data);
    } catch (error) {
      throw new Error("Error: " + error);
    }
  };

  useEffect(() => {
    getListDepartments();
  }, []);

  const { data: getDetailUser } = useGetDetailUser(user_id);

  useEffect(() => {
    if (getDetailUser) {
      form.setValue("email", getDetailUser?.email);
      form.setValue(
        "full_name",
        `${getDetailUser?.first_name} ${getDetailUser?.last_name}`
      );
      form.setValue("department", getDetailUser?.department?.id);
      form.setValue("role", getDetailUser?.role);
    }
  }, [getDetailUser]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      full_name: "",
      department: undefined,
      role: "",
    },
    shouldUnregister: false,
    mode: "all",
  });

  const { mutate: mutationUpdateUser, isPending: isPendingEditUser } =
    useUpdateUserDetail({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["users"],
        });
        form.clearErrors();
        setOpen(false);
      },
    });

  const onSubmit = async () => {
    const { department, role } = form.getValues();
    try {
      mutationUpdateUser({
        user_id,
        department_id: department,
        role,
      });
    } catch (error) {
      throw new Error("Error: " + error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white border-none">
        <DialogHeader className="flex flex-row items-start justify-between">
          <DialogTitle className="text-lightGrey-900 pt-4">
            Edit Information
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col justify-end gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[12px] font-medium text-lightGrey-900">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Input Email Here..."
                        {...field}
                        disabled
                        className={`placeholder:text-[14px] placeholder:font-light h-11 placeholder:text-lightGrey-500 text-sm outline-none bg-transparent ${
                          form.formState.errors.email && "border-red-500"
                        }`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[12px] font-medium text-lightGrey-900">
                      Full name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Full name..."
                        {...field}
                        disabled
                        className={`placeholder:text-[14px] placeholder:font-light h-11 placeholder:text-lightGrey-500 text-sm outline-none bg-transparent ${
                          form.formState.errors.email && "border-red-500"
                        }`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-[12px] font-medium text-lightGrey-900">
                      Department
                    </FormLabel>
                    <Popover
                      open={openDepartments}
                      onOpenChange={() => setOpenDepartments((i) => !i)}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "h-11 w-full border-lightGrey-200 justify-between",
                              !field.value &&
                                "text-[14px] font-light text-lightGrey-500 text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? departmentSelected?.find(
                                  (department: DepartmentType) =>
                                    department?.id === field.value
                                )?.name
                              : "Select department"}
                            <ChevronDown className="h-4 w-4 ml-2 opacity-50 shrink-0" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[460px] bg-white ">
                        <Command>
                          <CommandInput placeholder="Search department..." />
                          <CommandEmpty>No department found.</CommandEmpty>
                          <CommandGroup className="h-80 overflow-auto">
                            {departmentSelected.map(
                              (department: DepartmentType) => {
                                return (
                                  <CommandItem
                                    value={department.name}
                                    key={department.id}
                                    onSelect={() => {
                                      form.setValue(
                                        "department",
                                        department.id
                                      );
                                      setOpenDepartments(false);
                                    }}
                                    className={cn({
                                      "h-11": true,
                                      "rounded-md bg-lightGrey-100":
                                        department.id === field.value,
                                    })}
                                  >
                                    <CheckIcon
                                      className={cn(
                                        "h-4 w-4 mr-2",
                                        department.id === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {department.name}
                                  </CommandItem>
                                );
                              }
                            )}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="font-medium text-lightGrey-900 text-[12px]">
                      Role
                    </FormLabel>
                    <Popover
                      open={openRoles}
                      onOpenChange={() => setOpenRoles((i) => !i)}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-between border-lightGrey-200 h-11 ",
                              !field.value &&
                                "text-muted-foreground text-[14px] font-light text-lightGrey-500"
                            )}
                          >
                            {field.value
                              ? role.find((role) => role.value === field.value)
                                  ?.label
                              : "Select roles"}
                            <ChevronDown className="h-4 w-4 opacity-50 ml-2 shrink-0" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="bg-white w-[450px]">
                        <Command>
                          <CommandInput placeholder="Search role..." />
                          <CommandEmpty>No role found.</CommandEmpty>
                          <CommandGroup>
                            {role.map((role) => (
                              <CommandItem
                                value={role.label}
                                key={role.value}
                                onSelect={() => {
                                  form.setValue("role", role.value);
                                  setOpenRoles(false);
                                }}
                                className={cn({
                                  "h-11": true,
                                  "rounded-md bg-lightGrey-100":
                                    role.value === field.value,
                                })}
                              >
                                <CheckIcon
                                  className={cn(
                                    "h-4 w-4 mr-2 ",
                                    role.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {role.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="bg-lightGrey-50 border-none"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="bg-primary-500 text-white"
                disabled={isPendingEditUser}
              >
                {isPendingEditUser && (
                  <Icons.Spinner className="h-4 w-4 animate-spin mr-2" />
                )}
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMember;
