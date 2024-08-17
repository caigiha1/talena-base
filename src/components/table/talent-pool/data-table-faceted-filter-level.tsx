import * as React from "react";
import { CheckIcon } from "@radix-ui/react-icons";
import { Column } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { Button } from "@/components/ui/button.tsx";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command.tsx";
import { ChevronDownIcon, Icons } from "@/common/Icon.tsx";
import { useAppDispatch } from "@/redux/store.ts";
import { useState } from "react";
import { setQueryLevel } from "@/redux/slices/talent-pool-slice.ts";

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options?: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  resetPaging: () => any;
  showLabel?: boolean;
}

export function DataTableFacetedFilterLevel<TData, TValue>({
  column,
  title,
  options,
  resetPaging,
  showLabel = true,
}: Readonly<DataTableFacetedFilterProps<TData, TValue>>) {
  const dispatch = useAppDispatch();
  const [e, setE] = useState<boolean>(false);
  const selectedValues = new Set(column?.getFilterValue() as string[]);
  const handleQueryLevel = () => {
    dispatch(setQueryLevel(column?.getFilterValue() as string[]));
    setE(false);
    resetPaging();
  };

  return (
    <Popover open={e} onOpenChange={() => setE((open) => !open)}>
      <PopoverTrigger asChild>
        <div className="flex items-center justify-between    ">
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 whitespace-nowrap data-[state=open]:bg-accent      "
          >
            <p className="text-sm font-semibold">{title}</p>
          </Button>
          {selectedValues.size > 0 ? (
            <Icons.FilterIcon />
          ) : (
            <ChevronDownIcon className="h-2.5 w-2.5 mr-4      " />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-[200px] p-0 bg-white border border-meta-9"
        align="end"
      >
        <Command>
          <div className="px-2 py-2">
            <CommandInput placeholder={title} />
          </div>
          {selectedValues.size > 0 && (
            <>
              <CommandGroup>
                <div className="flex items-center justify-center w-full gap-2">
                  <CommandItem
                    onSelect={() =>
                      column?.setFilterValue(options?.map((o) => o.value))
                    }
                    onClick={() => handleQueryLevel()}
                    className="justify-center text-center text-primary rounded cursor-pointer hover:opacity-60   "
                  >
                    Select All
                  </CommandItem>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    onClick={() => handleQueryLevel()}
                    className="justify-center text-center text-primary rounded cursor-pointer hover:opacity-60   "
                  >
                    Clear filters
                  </CommandItem>
                </div>
              </CommandGroup>
              <CommandSeparator className="bg-blue   " />
            </>
          )}
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options?.map((x) => {
                const isSelected = selectedValues.has(x.value);
                return (
                  <CommandItem
                    key={x.value}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(x.value);
                      } else {
                        selectedValues.add(x.value);
                      }
                      const filterValues = Array.from(selectedValues);
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined
                      );
                    }}
                    className="flex"
                  >
                    {showLabel && <span>{x.label}</span>}
                    <div
                      className={cn(
                        "ml-auto flex h-4 w-4 items-center justify-center rounded-sm border border-primary     ",
                        isSelected
                          ? "bg-primary text-primary-foreground   "
                          : "opacity-50 [&_svg]:invisible  "
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4")} />
                    </div>
                  </CommandItem>
                );
              })}
              <CommandSeparator />
            </CommandGroup>
          </CommandList>
          <CommandGroup className="flex justify-end w-full gap-2 data-[selected=true]:bg-white p-2    ">
            <Button
              variant="outline"
              onClick={() => {
                column?.setFilterValue(undefined);
                setE(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="text-white bg-primary-500 hover:bg-primary-700 ml-2 "
              onClick={() => handleQueryLevel()}
            >
              Apply
            </Button>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
