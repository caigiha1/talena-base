import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import {
  useDeleteCampaign,
  useDeleteJD,
  useDeleteWorkspaceMember,
} from "@/service/react-query-hooks.ts";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { Row } from "@tanstack/react-table";
import { Campaign, JDDetail, WithId } from "@/type";
import { useState } from "react";
import { DeleteIcon, Icons } from "@/common/Icon";

export type CustomDialogProps<TData> = Readonly<{
  title: string;
  desc: string;
  titleButton: string;
  row?: Row<TData>;
  titleTable?: string;
  jd_data?: JDDetail;
  campaign_data?: Campaign;
}>;

export default function CustomDialog<TData>({
  title,
  desc,
  titleButton,
  row,
  titleTable,
  jd_data,
  campaign_data,
}: CustomDialogProps<TData>) {
  const queryClient = useQueryClient();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const isUserManagementPage = pathname === "/user-manage";
  const isListJDPage = pathname === "/job-description";
  const isListCampaignPage = pathname === "/campaigns";

  const { mutate: mutationDeleteJD, isPending: isPendingDeleteJD } =
    useDeleteJD({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["Jd"],
        });
        setOpen(false);
      },
    });

  const {
    mutate: mutationDeleteWorkspaceMember,
    isPending: isPendingDeleteUser,
  } = useDeleteWorkspaceMember({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      setOpen(false);
    },
  });

  const { mutate: mutationDeleteCampaign, isPending: isPendingDeleteCampaign } =
    useDeleteCampaign({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["campaigns"],
        });
        setOpen(false);
      },
    });

  const handleDeleteMultiple = (id: string) => {
    if (isUserManagementPage) {
      mutationDeleteWorkspaceMember({
        user_ids: [id],
      });
    }
  };
  const handleDeleteJD = (id: string) => {
    if (isListJDPage) {
      mutationDeleteJD({
        jd_ids: [id],
      });
    }
  };

  const handleDeleteCampaign = (id: string) => {
    if (isListCampaignPage) {
      mutationDeleteCampaign({
        campaign_ids: [id],
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen((o) => !o)}>
      <DialogTrigger className="flex flex-col">
        <div className="flex flex-col w-full">
          <div className="flex items-center mb-2">
            <div className="flex-shrink-0 bg-cover bg-no-repeat bg-center mr-2">
              <DeleteIcon width={24} height={24} />
            </div>
            <div className="flex flex-col flex-grow text-danger-800">
              <div className="flex items-start truncate font-inter text-md leading-6">
                {titleTable}
              </div>
              <div className="flex gap-2">
                {isListCampaignPage && (
                  <div className="line-clamp-1 flex overflow-hidden text-lightGrey-600 text-ellipsis font-inter text-sm font-normal leading-5">
                    {"Only Recruiter Lead can access"}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent
        className="border-none bg-white h-[220px] rounded-2xl"
        hideCloseButton={true}
      >
        <DialogHeader className="flex flex-row items-start justify-between">
          <DialogTitle className="text-danger-800 pt-4">{title}</DialogTitle>
          <button
            className="rounded-full bg-lightGrey-200 p-1.5"
            onClick={() => setOpen((o) => !o)}
          >
            <X className="w-5 h-5" />
          </button>
        </DialogHeader>
        <p className="font-normal">{desc}</p>
        <DialogFooter>
          <Button
            variant="outline"
            className="border-none bg-lightGrey-50"
            onClick={() => setOpen((o) => !o)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="text-white bg-danger-800 hover:opacity-60 hover:bg-danger-800"
            onClick={() => {
              handleDeleteMultiple((row?.original as WithId)?.id);
              handleDeleteJD(jd_data?.id ?? "");
              handleDeleteCampaign(campaign_data?.id ?? "");
            }}
            disabled={isPendingDeleteUser || isPendingDeleteJD}
          >
            {(isPendingDeleteUser ||
              isPendingDeleteJD ||
              isPendingDeleteCampaign) && (
              <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {titleButton}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
