import { cn } from "@/lib/utils.ts";

export default function Version({ className }: { className?: string }) {
  const VERSION = import.meta.env.VITE_VERSION;

  return (
    <div
      className={cn({ "flex items-center justify-end mx-2": true }, className)}
    >
      <p className="text-[12px] text-lightGrey-600">
        Version {VERSION || "v1.x.x"}
      </p>
    </div>
  );
}
