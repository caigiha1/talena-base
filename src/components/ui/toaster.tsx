import { Icons } from "@/common/Icon";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        iconLoading,
        iconSuccess,
        iconError,
        description,
        action,
        ...props
      }) {
        return (
          <Toast key={id} {...props}>
            <div className="flex gap-3">
              {iconLoading && (
                <Icons.Spinner className="min-h-5 min-w-5 animate-spin stroke-sky-400" />
              )}
              {iconSuccess && (
                <Icons.SuccessIcon className="min-h-4 min-w-4 mt-1" />
              )}
              {iconError && (
                <Icons.ErrorIcon className="min-h-4 min-w-4 mt-1" />
              )}
              <div>
                {title && (
                  <ToastTitle className="flex gap-2 text-black">
                    {title}
                  </ToastTitle>
                )}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
