import { FileError, useDropzone } from "react-dropzone";
import { UploadIcon } from "@/common/Icon.tsx";
import React, { SetStateAction, useEffect } from "react";
import { toast } from "@/components/ui/use-toast.ts";

const DragDropComponent = (props: {
  listPdf: File[];
  onFileSelect: React.Dispatch<SetStateAction<File[]>>;
  isLoading: boolean;
}) => {
  const { onFileSelect, isLoading, listPdf } = props;
  const { getRootProps, getInputProps, fileRejections, acceptedFiles } =
    useDropzone({
      accept: {
        "application/pdf": [],
      },
      maxSize: 9 * 1024 * 1024,
      maxFiles: 20,
    });

  const handleFileBotCreationRejectMessage = (error: FileError[]): string => {
    switch (error[0].code) {
      case "file-too-large":
        return "File is larger than 10 MB";
      case "file-invalid-type":
        return error[0].message;
      default:
        return "Maximum number of files can be uploaded is 20";
    }
  };

  useEffect(() => {
    if (fileRejections.length > 0) {
      toast({
        description: `${handleFileBotCreationRejectMessage(
          fileRejections[0].errors
        )}`,
        variant: "destructive",
      });
    }
  }, [fileRejections]);

  useEffect(() => {
    if (listPdf.concat(acceptedFiles).length > 20) {
      toast({
        description: "Maximum number of files can be uploaded is 20",
        variant: "destructive",
      });
    } else if (acceptedFiles.length > 0) {
      onFileSelect([...listPdf, ...acceptedFiles]);
    }
  }, [acceptedFiles]);

  return (
    <section className="flex items-center justify-center">
      <div {...getRootProps()}>
        <input
          {...getInputProps()}
          accept="application/pdf"
          required
          className="focus-within:ring-2 focus-within:ring-blue-300 focus-within:ring-offset-2"
          disabled={isLoading}
        />
        <div className="flex items-center justify-center mb-2">
          <UploadIcon />
        </div>
        <p className="flex items-center justify-center text-sm font-bold text-lightGrey-900">
          Upload or drop CV file here
        </p>
        <p className="text-center text-[12px] font-light text-lightGrey-500">
          PDF supported. Add up to 20 files, maximum 10MB/file.
        </p>
      </div>
    </section>
  );
};

export default DragDropComponent;
