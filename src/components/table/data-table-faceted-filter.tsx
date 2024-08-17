import { Popover, PopoverContent } from "../ui/popover";
import { ChevronDownIcon, Icons } from "@/common/Icon.tsx";
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
import { PopoverTrigger } from "@/components/ui/popover.tsx";
import { cn } from "@/lib/utils";
import { reset, setRoles } from "@/redux/slices/user-manager-slice.ts";
import { useAppDispatch } from "@/redux/store.ts";
import { CheckIcon } from "@radix-ui/react-icons";
import { Column } from "@tanstack/react-table";
import * as React from "react";
import { useState } from "react";

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options?: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  showLabel?: boolean;
  resetPaging: () => any;
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
  showLabel = true,
  resetPaging,
}: Readonly<DataTableFacetedFilterProps<TData, TValue>>) {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const selectedValues = new Set(column?.getFilterValue() as string[]);

  const handleMultiQueryFilter = () => {
    if (column?.id === "role") {
      dispatch(setRoles(column?.getFilterValue() as string[]));
      setOpen(false);
      resetPaging();
    }
  };

  return (
    <Popover open={open} onOpenChange={() => setOpen((open) => !open)}>
      <PopoverTrigger asChild>
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 whitespace-nowrap data-[state=open]:bg-accent"
          >
            <p className="text-sm font-semibold">{title}</p>
          </Button>
          {selectedValues.size > 0 ? (
            <Icons.FilterIcon />
          ) : (
            <ChevronDownIcon className="h-2.5 w-2.5 mr-4" />
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
                    onClick={() => handleMultiQueryFilter()}
                    className="justify-center text-center text-primary rounded cursor-pointer hover:opacity-60"
                  >
                    Select All
                  </CommandItem>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    onClick={() => handleMultiQueryFilter()}
                    className="justify-center text-center text-primary rounded cursor-pointer hover:opacity-60"
                  >
                    Clear filters
                  </CommandItem>
                </div>
              </CommandGroup>
              <CommandSeparator className="bg-blue" />
            </>
          )}
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options?.map((option) => {
                const isSelected = selectedValues.has(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(option.value);
                      } else {
                        selectedValues.add(option.value);
                      }
                      const filterValues = Array.from(selectedValues);
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined
                      );
                    }}
                    className="flex"
                  >
                    {option.icon && (
                      <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    {showLabel && (
                      <span className="hidden">{option.label}</span>
                    )}
                    <div
                      className={cn(
                        "ml-auto flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
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
          <CommandGroup className="flex justify-end w-full gap-2 data-[selected=true]:bg-white p-2">
            <Button
              variant="outline"
              onClick={() => {
                setOpen(false);
                dispatch(reset());
                column?.setFilterValue(undefined);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="text-white bg-primary-500 hover:bg-primary-700 ml-2"
              onClick={() => handleMultiQueryFilter()}
            >
              Apply
            </Button>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
