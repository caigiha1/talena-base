import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CirclePlusIcon, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label.tsx";
import { cn } from "@/lib/utils.ts";
import { Input } from "../ui/input";
import { Icons } from "@/common/Icon";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateDepartments } from "@/service/react-query-hooks.ts";

const formSchema = z.object({
  name: z.string().min(1, { message: "Please enter a valid name" }),
});

export default function AddDepartment() {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    clearErrors,
    formState: { errors },
    reset,
    register,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
    shouldUnregister: true,
    mode: "all",
  });

  const {
    mutate: mutationCreateDepartment,
    isPending: isPendingCreateDepartment,
  } = useCreateDepartments({
    onSuccess: () => {
      setIsOpen(false);
      clearErrors();
      queryClient.invalidateQueries({
        queryKey: ["departments"],
      });
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      mutationCreateDepartment({
        name: data.name,
      });
    } catch (error) {
      console.error("Error: ", error);
    }
  });

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-primary-500 text-white hover:bg-opacity-60"
          size="default"
          onClick={() => {
            reset();
            setIsOpen(true);
          }}
        >
          <CirclePlusIcon className="mr-2 h-6 w-6" />
          Create Department
        </Button>
      </DialogTrigger>
      <DialogContent hideCloseButton={true}>
        <div>
          <DialogHeader className="flex flex-row items-start justify-between">
            <DialogTitle className="text-lightGrey-900 pt-1 font-bold">
              Create department
            </DialogTitle>
            <DialogClose asChild>
              <button className="rounded-full" onClick={() => setIsOpen(false)}>
                <X className="w-4 h-4" />
              </button>
            </DialogClose>
          </DialogHeader>
        </div>

        <form onSubmit={onSubmit} className="">
          <div className="flex flex-col justify-end gap-2">
            <Label
              htmlFor="department"
              className="text-left text-[12px] font-semibold"
            >
              Department Name <span className="text-danger-800 text-lg">*</span>
            </Label>
            <Input
              id="name"
              type="text"
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
                    className="border-none bg-lightGrey-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                </DialogClose>
              </div>
              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  className="text-white bg-primary-500"
                  disabled={isPendingCreateDepartment}
                >
                  {isPendingCreateDepartment && (
                    <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Create
                </Button>
              </div>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
