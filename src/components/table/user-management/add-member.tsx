import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ChevronDown, CirclePlusIcon, X } from "lucide-react";
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
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/common/Icon";
import {
  useInvitationUser,
  useValidateMember,
} from "@/service/react-query-hooks";
import useDebounce from "@/hooks/use-debounce";

type SubmitData = {
  email: string;
  department: string;
  role: string;
};

type DepartmentType = {
  id: string;
  name: string;
  members_details: string[];
  created_at: string;
  updated_at: string;
};

const formSchema = z.object({
  email: z.string().email().min(1, { message: "Please enter a valid email" }),
  full_name: z.string(),
  department: z.string().min(1, { message: "Please select department" }),
  role: z.string().min(1, { message: "Please select role" }),
});

export default function AddMember() {
  const [open, setOpen] = useState(false);
  const [openDepartmentsList, setOpenDepartmentsList] = useState(false);
  const [openRolesList, setOpenRolesList] = useState(false);
  const [isValidateEmail, setIsValidateEmail] = useState("normal");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      full_name: "",
      department: "",
      role: "",
    },
    shouldUnregister: true,
    mode: "all",
  });

  const [departmentSelected, setDepartmentSelected] = useState<
    DepartmentType[]
  >([]);

  const getListDepartments = async () => {
    try {
      const res = await DepartmentAPI.listDepartmentSelected();
      setDepartmentSelected(res?.data);
    } catch (error) {}
  };

  useEffect(() => {
    getListDepartments();
  }, []);

  const { mutate: mutationValidateMember } = useValidateMember({
    onSuccess: (data) => {
      setIsValidateEmail("success");
      form.setValue(
        "full_name",
        `${data?.user_info?.first_name} ${data?.user_info?.last_name}`
      );
    },
    onError: (error) => {
      setIsValidateEmail("error");
      console.error(error);
    },
  });

  const debounceValue = useDebounce(form.watch("email"), 1000);

  useEffect(() => {
    if (debounceValue) {
      mutationValidateMember({ email: debounceValue });
    }
  }, [debounceValue, mutationValidateMember]);

  const { mutate: mutationInvitationUser, isPending: isPendingInvitation } =
    useInvitationUser({
      onSuccess: () => {
        form.clearErrors();
        setOpen(false);
        toast({
          title: "Invite member successfull",
          description: "Invite member successfull",
          variant: "success",
        });
      },
      onError: (error) => {
        toast({
          title: "Invite member error",
          description: (error as any).response.data.detail,
          variant: "destructive",
        });
      },
    });

  const onSubmit = async (data: SubmitData) => {
    try {
      const { email, department, role } = data;
      mutationInvitationUser({
        user_emails: [email],
        department_id: department,
        role,
      });
    } catch (error) {
      toast({
        title: "Invite member error",
        description: (error as any).response.data.detail,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen((o) => !o);
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-primary-500 text-white hover:bg-opacity-60"
          size="default"
          onClick={() => {
            form.reset();
          }}
        >
          <CirclePlusIcon className="mr-2 h-6 w-6" />
          Invite Member
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white border-none" hideCloseButton={true}>
        <DialogHeader className="flex flex-row items-start justify-between">
          <DialogTitle className="text-lightGrey-900 pt-4">
            Invite member
          </DialogTitle>
          <button
            className="rounded-full bg-lightGrey-200 p-1.5"
            onClick={() => {
              setOpen((o) => !o);
              setIsValidateEmail("normal");
            }}
          >
            <X className="w-5 h-5" />
          </button>
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
                      Email <span className="text-danger-800 text-lg">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Input Email Here..."
                        {...field}
                        className={`
                          placeholder:text-[14px] placeholder:font-light h-11 placeholder:text-lightGrey-500 text-sm outline-none bg-transparent
                          ${
                            (form.formState.errors.email ||
                              isValidateEmail === "error") &&
                            "border-red-500"
                          }
                          ${isValidateEmail === "success" && "border-success"}
                        `}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isValidateEmail === "success" && (
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
              )}
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-[12px] font-medium text-lightGrey-900">
                      Department{" "}
                      <span className="text-danger-800 text-lg">*</span>
                    </FormLabel>
                    <Popover
                      open={openDepartmentsList}
                      onOpenChange={() => setOpenDepartmentsList((o) => !o)}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-between border-lightGrey-200 h-11",
                              !field.value &&
                                "text-muted-foreground text-[14px] font-light text-lightGrey-500",
                              form.formState.errors.department &&
                                "border-red-500"
                            )}
                          >
                            {field.value
                              ? departmentSelected?.find(
                                  (department: DepartmentType) =>
                                    department?.id === field.value
                                )?.name
                              : "Select department"}
                            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[460px] bg-white ">
                        <Command>
                          <CommandInput placeholder="Search department..." />
                          <CommandEmpty>No department found.</CommandEmpty>
                          <CommandGroup className="overflow-auto h-80">
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
                                      setOpenDepartmentsList(false);
                                    }}
                                    className={cn({
                                      "h-11": true,
                                      "bg-lightGrey-100 rounded-md":
                                        department.id === field.value,
                                    })}
                                  >
                                    <CheckIcon
                                      className={cn(
                                        "mr-2 h-4 w-4",
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
                    <FormLabel className="text-[12px] font-medium text-lightGrey-900">
                      Role <span className="text-danger-800 text-lg">*</span>
                    </FormLabel>
                    <Popover
                      open={openRolesList}
                      onOpenChange={() => setOpenRolesList((o) => !o)}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "h-11 w-full border-lightGrey-200 justify-between",
                              !field.value &&
                                "text-[14px] text-lightGrey-500 text-muted-foreground font-light",
                              form.formState.errors.role && "border-red-500"
                            )}
                          >
                            {field.value
                              ? role.find((role) => role.value === field.value)
                                  ?.label
                              : "Select roles"}
                            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[450px] bg-white">
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
                                  setOpenRolesList(false);
                                }}
                                className={cn({
                                  "h-11": true,
                                  "bg-lightGrey-100 rounded-md":
                                    role.value === field.value,
                                })}
                              >
                                <CheckIcon
                                  className={cn(
                                    "mr-2 h-4 w-4",
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
              <Button
                variant="outline"
                className="border-none bg-lightGrey-50"
                onClick={() => {
                  setOpen((o) => !o);
                  setIsValidateEmail("normal");
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="text-white bg-primary-500"
                disabled={isPendingInvitation || isValidateEmail === "error"}
              >
                {isPendingInvitation && (
                  <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Send invitation
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
