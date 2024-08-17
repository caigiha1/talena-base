import React, { Ref } from "react";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { CheckedState } from "@radix-ui/react-checkbox";
import { cn } from "@/lib/utils.ts";

const SelectCheckbox = ({
  className,
  checked,
  onCheckedChange,
  ariaLabel,
  children,
  ref,
}: {
  checked: boolean | "indeterminate" | CheckedState | undefined;
  onCheckedChange?: (value: boolean) => void;
  ariaLabel?: string;
  children?: React.ReactNode;
  className?: string;
  ref?: Ref<HTMLButtonElement>;
}) => (
  <div className="flex justify-between items-center p-2">
    {children}
    <Checkbox
      ref={ref}
      checked={checked}
      onCheckedChange={onCheckedChange}
      aria-label={ariaLabel}
      className={cn(
        {
          "border-2 border-lightGrey-300 rounded-sm translate-y-[2px] data-[state=checked]:bg-primary-500 data-[state=checked]:text-white data-[state=checked]:rounded data-[state=checked]:border-none h-4.5 w-4.5":
            true,
        },
        className,
      )}
    />
  </div>
);

export default SelectCheckbox;
