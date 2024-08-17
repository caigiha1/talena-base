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
import { Icons } from "@/common/Icon";
import { SetStateAction } from "react";

export type CustomDialogProps<TData> = Readonly<{
  open: boolean;
  onOpenChange: (o: boolean) => void;
  title: string;
  desc: string;
  buttonText: string;
  data: TData;
  hintText?: string;
  menuIcon: any;
  buttonType?: "danger" | "primary";
  menuText?: string;
  pending: boolean;
  handleAction: (data: TData) => void;
  onOpenMenu: React.Dispatch<SetStateAction<boolean>>;
}>;

export default function CustomDialog<TData>({
  open,
  onOpenChange,
  title,
  desc,
  data,
  hintText,
  buttonText,
  buttonType = "danger",
  menuIcon,
  menuText,
  pending,
  handleAction,
  onOpenMenu,
}: CustomDialogProps<TData>) {
  const handleCancelAction = () => {
    onOpenChange(false);
    onOpenMenu(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger className="flex flex-col gap-2 text-sm font-medium cursor-pointer hover:bg-lightGrey-100 py-2  border-b border-lightGrey-200 pl-2 pr-7 w-full">
        <div className="flex flex-col w-full">
          <div className="flex items-center mb-2">
            <div className="flex-shrink-0 bg-cover bg-no-repeat bg-center mr-2">
              {menuIcon}
            </div>
            <div className={`flex flex-col flex-grow text-${buttonType}-800`}>
              <div className="flex items-start truncate text-md leading-6">
                {menuText}
              </div>
              <div className="flex gap-2">
                {hintText && (
                  <div className="line-clamp-1 flex overflow-hidden text-lightGrey-600 text-ellipsis font-inter text-sm font-normal leading-5">
                    {hintText}
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
          <DialogTitle className={`text-${buttonType}-800 pt-4`}>
            {title}
          </DialogTitle>
          <button
            className="rounded-full bg-lightGrey-200 p-1.5"
            onClick={handleCancelAction}
          >
            <X className="w-5 h-5" />
          </button>
        </DialogHeader>
        <p className="font-normal">{desc}</p>
        <DialogFooter>
          <Button
            variant="outline"
            className="border-none bg-lightGrey-50 transition hover:opacity-60"
            onClick={handleCancelAction}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className={`text-white bg-primary-500 hover:opacity-60 duration-200 transition`}
            onClick={() => {
              handleAction(data);
              onOpenMenu(false);
            }}
            disabled={pending}
          >
            {pending && <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />}
            {buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
