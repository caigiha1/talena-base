import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className,
    )}
    {...props}
  >
    <TooltipProvider>
      <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
        <SliderPrimitive.Range className="absolute h-full bg-primary-500" />
      </SliderPrimitive.Track>
      <Tooltip>
        <TooltipTrigger asChild>
          <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border-4 border-primary-500 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
        </TooltipTrigger>
        <TooltipContent>
          <p>{props?.value?.[0]}</p>
        </TooltipContent>
      </Tooltip>
      {props?.value?.[1] ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border-4 border-primary-500 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
          </TooltipTrigger>
          <TooltipContent>
            <p>{props?.value?.[1]}</p>
          </TooltipContent>
        </Tooltip>
      ) : null}
    </TooltipProvider>
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
