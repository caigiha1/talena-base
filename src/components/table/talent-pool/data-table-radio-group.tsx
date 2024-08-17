import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ChevronDownIcon } from "@/common/Icon.tsx";
import { Column } from "@tanstack/react-table";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command.tsx";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
import { setQueryGpa } from "@/redux/slices/talent-pool-slice.ts";
import { useAppDispatch, useAppSelector } from "@/redux/store.ts";

interface DataTableRadioGroupProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  resetPaging: () => any;
}

export function DataTableRadioGroup<TData, TValue>({
  column,
  title,
  resetPaging,
}: Readonly<DataTableRadioGroupProps<TData, TValue>>) {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [val, setVal] = useState([0, 0]);

  const currentFilterValue = useAppSelector(
    (state) => state.talentPool.queryGpa
  );

  useEffect(() => {
    if (currentFilterValue) {
      setVal(currentFilterValue);
    }
  }, [currentFilterValue]);

  const handleQueryGpa = () => {
    dispatch(setQueryGpa(val));
    setOpen(false);
    resetPaging();
  };

  return (
    <Popover open={open} onOpenChange={() => setOpen((open) => !open)}>
      <PopoverTrigger asChild>
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            size="sm"
            className="whitespace-nowrap -ml-3 h-8 data-[state=open]:bg-accent"
          >
            <p className="font-semibold text-sm">{title}</p>
          </Button>
          <ChevronDownIcon className="mr-4 h-2.5 w-2.5" />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="p-0 bg-white border border-meta-9 w-[200px]"
        align="end"
      >
        <Command>
          <CommandSeparator className="bg-blue" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              <RadioGroup
                value={val.join("-")}
                onValueChange={(value) => {
                  const [min, max] = value.split("-").map(Number);
                  setVal([min, max]);
                }}
                className="p-3"
              >
                <div className="flex items-center justify-between">
                  <Label htmlFor="r1">1-2</Label>
                  <RadioGroupItem
                    value="1-2"
                    id="r1"
                    checked={val.join("-") === "1-2"}
                    onClick={() => setVal([1, 2])}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="r2">2-3</Label>
                  <RadioGroupItem
                    value="2-3"
                    id="r2"
                    checked={val.join("-") === "2-3"}
                    onClick={() => setVal([2, 3])}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="r3">3-4</Label>
                  <RadioGroupItem
                    value="3-4"
                    id="r3"
                    checked={val.join("-") === "3-4"}
                    onClick={() => setVal([3, 4])}
                  />
                </div>
              </RadioGroup>
              <CommandSeparator className="my-2" />
              <CommandItem className="flex justify-end w-full gap-2 data-[selected=true]:bg-white">
                <Button
                  variant="outline"
                  onClick={() => {
                    column?.setFilterValue(undefined);
                    setOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="text-white bg-primary-500 hover:bg-primary-700"
                  onClick={() => handleQueryGpa()}
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
