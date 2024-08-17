import { Icons } from "@/common/Icon.tsx";
import React from "react";

export default function LoadingWrapper({
  isLoading,
  children,
}: Readonly<{
  isLoading: boolean;
  children?: React.ReactNode;
}>) {
  return (
    <>
      {isLoading ? (
        <div className="flex min-h-[calc(100vh-300px)] w-full items-center justify-center">
          <Icons.Spinner className="h-8 w-8 animate-spin" />
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
