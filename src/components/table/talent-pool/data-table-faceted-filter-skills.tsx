import * as React from "react";
import { Column } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { Button } from "@/components/ui/button.tsx";

import { Command, CommandGroup } from "@/components/ui/command.tsx";
import { ChevronDownIcon, Icons } from "@/common/Icon.tsx";
import { useAppDispatch } from "@/redux/store.ts";
import { useState } from "react";
import { setQuerySkills } from "@/redux/slices/talent-pool-slice.ts";
import { SearchIcon } from "lucide-react";
import useDebounce from "@/hooks/use-debounce.tsx";

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

export function DataTableFacetedFilterSkills<TData, TValue>({
  column,
  title,
  resetPaging,
}: Readonly<DataTableFacetedFilterProps<TData, TValue>>) {
  const dispatch = useAppDispatch();
  const [x, setX] = useState<boolean>(false);
  const debounceSkills = useDebounce([column?.getFilterValue()], 500);
  const handleQueryTalentPool = () => {
    dispatch(setQuerySkills(debounceSkills as string[]));
    resetPaging();
  };

  return (
    <Popover open={x} onOpenChange={() => setX((open) => !open)}>
      <PopoverTrigger asChild>
        <div className="flex items-center justify-between   ">
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 whitespace-nowrap data-[state=open]:bg-accent   "
          >
            <p className="text-sm font-semibold">{title}</p>
          </Button>
          {column?.getFilterValue() ? (
            <Icons.FilterIcon />
          ) : (
            <ChevronDownIcon className="h-2.5 w-2.5 mr-4   " />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-[200px] p-0 bg-white border border-meta-9   "
        align="end"
      >
        <Command>
          <div className="px-2 py-2">
            <div
              className={cn({
                "flex h-9 w-full items-center rounded-[10px] bg-white text-sm text-black transition-colors placeholder:text-slate-900 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-1 ring-offset-0 ring-offset-lightGrey-200 ring-lightGrey-200   ":
                  true,
              })}
            >
              <SearchIcon className="ml-2 h-6 w-6" />
              <input
                className="h-full w-full border-none bg-transparent pl-2 focus:outline-none focus:ring-0  "
                placeholder={title}
                value={(column?.getFilterValue() as string[]) ?? ""}
                onChange={(e) => {
                  column?.setFilterValue(e.target.value);
                }}
              />
            </div>
          </div>
          <CommandGroup className="flex justify-end w-full gap-2 data-[selected=true]:bg-white p-2">
            <Button
              variant="outline"
              onClick={() => {
                column?.setFilterValue(undefined);
                setX(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="text-white bg-primary-500 hover:bg-primary-700 ml-2"
              onClick={() => handleQueryTalentPool()}
            >
              Apply
            </Button>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
