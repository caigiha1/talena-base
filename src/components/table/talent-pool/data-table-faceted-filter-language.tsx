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
import { setQueryLanguage } from "@/redux/slices/talent-pool-slice.ts";
import { useGetUniversityFilter } from "@/service/react-query-hooks.ts";

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

export function DataTableFacetedFilterLanguage<TData, TValue>({
  column,
  title,
  showLabel = true,
  resetPaging,
}: Readonly<DataTableFacetedFilterProps<TData, TValue>>) {
  const dispatch = useAppDispatch();
  const { data: dataGetUniversity } = useGetUniversityFilter();
  const options = dataGetUniversity?.languages;
  const [op, setOp] = useState<boolean>(false);
  const selectedValues = new Set(column?.getFilterValue() as string[]);
  const handleQueryLanguage = () => {
    dispatch(setQueryLanguage(column?.getFilterValue() as string[]));
    setOp(false);
    resetPaging();
  };

  const handleCancelFilter = () => {
    column?.setFilterValue(undefined);
    setOp(false);
  };

  return (
    <Popover open={op} onOpenChange={() => setOp((open) => !open)}>
      <PopoverTrigger asChild>
        <div className="flex items-center justify-between     ">
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 whitespace-nowrap h-8  data-[state=open]:bg-accent "
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
        className="w-[200px] border-meta-9 p-0 bg-white border    "
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
                      column?.setFilterValue(options?.map((o) => o))
                    }
                    onClick={() => handleQueryLanguage()}
                    className="justify-center text-center text-primary rounded cursor-pointer hover:opacity-60"
                  >
                    Select All
                  </CommandItem>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    onClick={() => handleQueryLanguage()}
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
              {options?.map((u) => {
                const isSelected = selectedValues.has(u);
                return (
                  <CommandItem
                    key={u}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(u);
                      } else {
                        selectedValues.add(u);
                      }
                      const filterValues = Array.from(selectedValues);
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined
                      );
                    }}
                    className="flex"
                  >
                    {showLabel && <span>{u}</span>}
                    <div
                      className={cn(
                        "mr-2 ml-auto flex w-4 h-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4 text-white")} />
                    </div>
                  </CommandItem>
                );
              })}
              <CommandSeparator />
            </CommandGroup>
          </CommandList>
          <CommandGroup className="flex  p-2 justify-end w-full gap-2 data-[selected=true]:bg-white   ">
            <Button variant="outline" onClick={handleCancelFilter}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="text-white bg-primary-500 hover:bg-primary-700 ml-2"
              onClick={() => handleQueryLanguage()}
            >
              Apply
            </Button>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
