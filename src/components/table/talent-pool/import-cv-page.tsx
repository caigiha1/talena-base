import { Button } from "@/components/ui/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import DragDropComponent from "@/components/table/talent-pool/dnd.tsx";
import React, { SetStateAction, useState } from "react";
import { DeleteIcon, Icons } from "@/common/Icon.tsx";
import { bytesToSize } from "@/lib/utils.ts";
import { useImportCv } from "@/service/react-query-hooks.ts";

export default function ImportCvPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const { mutate: mutationImportCv, isPending } = useImportCv({
    onSuccess: () => {
      setOpen(false);
    },
  });

  function clearFiles() {
    setOpen((open) => !open);
    setFiles([]);
  }

  async function uploadFile(event: React.FormEvent) {
    event.preventDefault();
    if (!files.length) return;
    const body = new FormData();
    files.forEach((file: File) => {
      body.append("files", file);
    });
    mutationImportCv(body);
  }

  return (
    <Dialog open={open} onOpenChange={() => clearFiles()}>
      <DialogTrigger asChild>
        <Button className="bg-primary-500 text-white hover:opacity-60 transition duration-150 font-[20px]">
          Import CV
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[638px] bg-white border-none"
        hideCloseButton
      >
        <DialogHeader className="flex flex-row items-start justify-between">
          <DialogTitle className="text-lightGrey-900 pt-4">
            Import CV
          </DialogTitle>
          <button
            className="rounded-full bg-lightGrey-200 p-1.5"
            onClick={() => clearFiles()}
          >
            <X className="w-5 h-5" />
          </button>
        </DialogHeader>
        <div className="bg-lightGrey-50 h-[220px] flex justify-center items-center rounded-md border-2 border-dashed border-lightGrey-200 cursor-pointer">
          <DragDropComponent
            onFileSelect={setFiles}
            listPdf={files}
            isLoading={isPending}
          />
        </div>
        <div className="space-y-2 max-h-[340px] overflow-y-auto">
          {files.map((file, index) => (
            <RenderFileList file={file} key={index} onFileSelect={setFiles} />
          ))}
        </div>
        <DialogFooter>
          <Button
            variant="ghost"
            className="bg-lightGrey-200"
            onClick={() => clearFiles()}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            className="text-white bg-primary-500"
            onClick={(e) => uploadFile(e)}
            disabled={isPending || !files.length}
          >
            {isPending && (
              <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Import
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function RenderFileList(props: {
  file: File;
  onFileSelect: React.Dispatch<SetStateAction<File[]>>;
}) {
  const { file, onFileSelect } = props;

  function removeFile() {
    onFileSelect((prevFiles) => prevFiles.filter((f) => f !== file));
  }

  return (
    <div className="border-lightGrey-200 border rounded p-3 flex flex-row w-full">
      <div className="mt-1">
        <Icons.PdfIcon />
      </div>
      <div className="flex flex-col ml-3">
        <p className="text-xs font-medium">{file.name}</p>
        <span className="text-xs font-normal text-lightGrey-600">
          {bytesToSize(file.size)}
        </span>
      </div>
      <button
        className="ml-auto flex justify-center items-center cursor-pointer"
        onClick={removeFile}
      >
        <DeleteIcon />
      </button>
    </div>
  );
}
