import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { DeleteIcon, EditDepartmentIcon, EditUserIcon } from "@/common/Icon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SappModalV2 from "../base/modal";
import ModalContentDelete from "./modal-confirm";
import EditDepartment from "./edit-department";
import { Row } from "@tanstack/react-table";
import CustomDialog from "@/components/ui/custom-dialog.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { WithId } from "@/type";
import { Departments, Users } from "./data/schema";
import EditMember from "./user-management/edit-member";
import { useDeleteDepartment } from "@/service/react-query-hooks.ts";
import { useQueryClient } from "@tanstack/react-query";

type DataTableRowActionsProps<TData> = {
  row: Row<TData>;
};

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const textDelete =
    location.pathname === "/user-manage" ? "Delete User" : "Delete Department";
  const textEdit =
    location.pathname === "/user-manage" ? "Edit User" : "Edit Information";
  const isUserManagePage = location.pathname === "/user-manage";
  const isDeparmentPage = location.pathname === "/user-manage/department-list";
  const isTalentPage = location.pathname === "/talent";

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isEditMemberOpen, setIsEditMemberOpen] = useState(false);

  const handleEdit = () => {
    setIsEditOpen(true);
  };

  const handleDelete = () => {
    setIsDeleteOpen(true);
  };
  const handleCloseModalDelete = () => {
    setIsDeleteOpen(!isDeleteOpen);
  };

  const { mutate: mutationDelDepartment } = useDeleteDepartment({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["departments"],
      });
    },
  });

  const handleConfirmDelete = async (id: string) => {
    try {
      if (isUserManagePage) {
        // TODO: delete user
      } else if (isDeparmentPage) {
        mutationDelDepartment({
          department_ids: [id],
        });
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
    } finally {
      setIsDeleteOpen(false);
    }
  };

  const handleNavigateToEdit = (row: Row<TData>) => {
    if (isUserManagePage) {
      setIsEditMemberOpen(true);
    } else if (isTalentPage) {
      navigate(`/talent/${(row.original as WithId).id}/edit`);
    } else if (isDeparmentPage) {
      navigate(
        `/user-manage/department-list/${(row.original as WithId).id}/edit`
      );
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="default"
            className="flex h-7 w-6 p-0 data-[state=open]:bg-muted bg-[#F3F4F6] rounded-full shadow-none hover:bg-lightGrey-300"
          >
            <DotsVerticalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-white border-lightGrey-200"
        >
          {isDeparmentPage && (
            <>
              <DropdownMenuItem
                className="flex items-start self-stretch py-4 gap-2 px-6 border-b border-lightGrey-200 roulded-lg cursor-pointer text-urbannist"
                onSelect={handleEdit}
              >
                <EditDepartmentIcon />
                <div>{textEdit}</div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex py-4 items-start gap-2 px-6 self-stretch border-b border-lightGrey-200 cursor-pointer text-danger-800 text-urbannist"
                onSelect={handleDelete}
              >
                <DeleteIcon />
                <span className="text-danger-800">{textDelete}</span>
              </DropdownMenuItem>
            </>
          )}
          {isUserManagePage && (
            <>
              <DropdownMenuItem
                onClick={() => handleNavigateToEdit(row)}
                className="flex gap-2 cursor-pointer hover:bg-lightGrey-100 py-2"
              >
                <EditUserIcon />
                Edit Information
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-lightGrey-200" />
              <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
                className="flex gap-2 cursor-pointer hover:bg-lightGrey-100 py-2"
              >
                <CustomDialog
                  desc={
                    "Are you sure you want to remove this account from “Techvify Software”? This action cannot be undone."
                  }
                  title={"Remove account"}
                  titleButton={"Delete"}
                  row={row}
                  titleTable={"Delete User"}
                />
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <SappModalV2
        open={isDeleteOpen}
        cancelButtonCaption={"Cancel"}
        okButtonCaption={"Đồng ý"}
        handleCancel={handleDelete}
        onOk={() => handleConfirmDelete((row.original as Departments).id)}
        showOkButton={true}
        showHeader={true}
        title={"Delete department"}
        buttonSize="medium"
        handleCloseModal={handleCloseModalDelete}
        classNameTitle={"pb-6"}
      >
        <ModalContentDelete />
      </SappModalV2>
      {isEditOpen && (
        <EditDepartment
          department_id={(row.original as Departments).id}
          open={isEditOpen}
          setOpen={setIsEditOpen}
        />
      )}
      {isEditMemberOpen && (
        <EditMember
          user_id={(row.original as Users).id}
          open={isEditMemberOpen}
          setOpen={setIsEditMemberOpen}
        />
      )}
    </>
  );
}
