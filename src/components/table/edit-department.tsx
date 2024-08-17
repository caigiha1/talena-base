import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { DepartmentAPI } from "@/service/department";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Icons } from "@/common/Icon";
import { useEditDepartment } from "@/service/react-query-hooks.ts";
import { useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  name: z.string().min(1, { message: "Please enter a valid name" }),
});

type Props = {
  department_id: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const EditDepartment = (props: Props) => {
  const { department_id, open, setOpen } = props;
  const queryClient = useQueryClient();
  const [name, setName] = useState("");

  const departmentDetails = async () => {
    try {
      const res = await DepartmentAPI.departmentDetails(department_id);
      if (res) {
        setName(res?.name);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (department_id) {
      departmentDetails();
    }
  }, [department_id]);

  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name,
    },
    shouldUnregister: true,
    mode: "onSubmit",
  });

  const {
    mutate: mutationUpdateDepartment,
    isPending: isPendingUpdateDepartment,
  } = useEditDepartment({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["departments"],
      });
      setOpen(false);
      clearErrors();
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    const name = data.name;
    try {
      mutationUpdateDepartment({
        name: name,
        department_id,
      });
    } catch (error) {}
  });

  useEffect(() => {
    if (name) {
      setValue("name", name);
    }
  }, [name]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit department</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="">
          <div className="flex flex-col justify-end gap-2">
            <Label htmlFor="department" className="text-left text-[12px]">
              Department Name
            </Label>
            <Input
              id="name"
              type="text"
              defaultValue={name}
              className="group rounded-md border border-lightGrey-200 px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
              placeholder={"Write a name..."}
              {...register("name")}
            />
            {errors.name && (
              <p className={cn("text-[0.8rem] font-medium text-danger-900")}>
                {errors.name.message}
              </p>
            )}
          </div>
          <DialogFooter>
            <div className=" justify-end flex gap-6">
              <div className="flex justify-end pt-4">
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="border-none text-lightGrey-900 bg-lightGrey-100 hover:bg-lightGrey-300"
                  >
                    Cancel
                  </Button>
                </DialogClose>
              </div>
              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  className="text-white bg-primary-500 hover:bg-primary-700"
                  disabled={isPendingUpdateDepartment}
                >
                  {isPendingUpdateDepartment && (
                    <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Save
                </Button>
              </div>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDepartment;
