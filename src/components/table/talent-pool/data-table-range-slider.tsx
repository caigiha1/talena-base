import { Slider } from "@/components/ui/slider.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ChevronDownIcon, Icons } from "@/common/Icon.tsx";
import { useState } from "react";
import { Column } from "@tanstack/react-table";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useAppDispatch } from "@/redux/store.ts";
import { setMinMaxYOE } from "@/redux/slices/talent-pool-slice.ts";

interface DataTableRangeSliderProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  resetPaging: () => any;
}

export function DataTableRangeSlider<TData, TValue>({
  column,
  title,
  resetPaging,
}: Readonly<DataTableRangeSliderProps<TData, TValue>>) {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [val, setVal] = useState([5, 15]);

  const updateFirstElement = (newValue: number) => {
    setVal((prevVal) => {
      const newVal = [...prevVal];
      newVal[0] = newValue;
      return newVal;
    });
  };

  const updateSecondElement = (newValue: number) => {
    setVal((prevVal) => {
      const newVal = [...prevVal];
      newVal[1] = newValue;
      return newVal;
    });
  };
  const handleQueryUniversity = () => {
    column?.setFilterValue(val);
    dispatch(setMinMaxYOE(val));
    setOpen(false);
    resetPaging();
  };

  const isDefaultVal = val[0] === 5 && val[1] === 15;

  return (
    <Popover open={open} onOpenChange={() => setOpen((open) => !open)}>
      <PopoverTrigger asChild>
        <div className="flex justify-between items-center     ">
          <Button
            variant="ghost"
            size="sm"
            className="whitespace-nowrap -ml-3 h-8 data-[state=open]:bg-accent    "
          >
            <p className="font-semibold text-sm">{title}</p>
          </Button>
          {isDefaultVal ? (
            <ChevronDownIcon className="h-2.5 w-2.5 mr-4   " />
          ) : (
            <Icons.FilterIcon />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="p-0 bg-white border border-meta-9 w-[200px]     "
        align="end"
      >
        <Command>
          <CommandSeparator className="bg-blue" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              <CommandItem className="flex gap-3">
                <Input
                  onChange={(e) => updateFirstElement(Number(e.target.value))}
                  value={val[0]}
                />
                <CommandSeparator className="bg-blue    " />
                <Input
                  onChange={(e) => updateSecondElement(Number(e.target.value))}
                  value={val[1]}
                />
              </CommandItem>
              <CommandItem className="flex">
                <Slider
                  min={0}
                  max={30}
                  step={1}
                  value={val}
                  onValueChange={(i) => setVal(i)}
                />
              </CommandItem>
              <CommandSeparator className="my-2" />
              <CommandItem className="flex justify-end w-full gap-2 data-[selected=true]:bg-white             ">
                <Button
                  variant="outline"
                  onClick={() => {
                    column?.setFilterValue(undefined);
                    dispatch(setMinMaxYOE([0]));
                    setVal([5, 15]);
                    setOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="text-white bg-primary-500 hover:bg-primary-700    "
                  onClick={handleQueryUniversity}
                >
                  Apply
                </Button>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
