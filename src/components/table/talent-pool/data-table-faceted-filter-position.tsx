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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { cn } from "@/lib/utils";
import { setQueryPosition } from "@/redux/slices/talent-pool-slice.ts";
import { useAppDispatch } from "@/redux/store.ts";
import { CheckIcon } from "@radix-ui/react-icons";
import { Column } from "@tanstack/react-table";
import { useState } from "react";
import { useGetPositionFilter } from "@/service/react-query-hooks.ts";

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  showLabel?: boolean;
  resetPaging: () => any;
}

export function DataTableFacetedFilterPosition<TData, TValue>({
  column,
  title,
  showLabel = true,
  resetPaging,
}: Readonly<DataTableFacetedFilterProps<TData, TValue>>) {
  const dispatch = useAppDispatch();
  const selectValue = new Set(column?.getFilterValue() as string[]);
  const [p, setP] = useState<boolean>(false);
  const { data: dataGetPosition } = useGetPositionFilter();
  const options = dataGetPosition?.positions;
  const handleQueryPosition = () => {
    dispatch(setQueryPosition(column?.getFilterValue() as string[]));
    setP(false);
    resetPaging();
  };

  return (
    <Popover open={p} onOpenChange={() => setP((open) => !open)}>
      <PopoverTrigger asChild>
        <div className="justify-between flex items-center">
          <Button
            variant="ghost"
            size="sm"
            className="whitespace-nowrap -ml-3 h-8 data-[state=open]:bg-accent"
          >
            <p className="font-semibold text-sm">{title}</p>
          </Button>
          {selectValue.size > 0 ? (
            <Icons.FilterIcon />
          ) : (
            <ChevronDownIcon className="h-2.5 w-2.5 mr-4   " />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="bg-white p-0 border border-meta-9 w-[200px]"
        align="end"
      >
        <Command>
          <div className="px-2 py-2">
            <CommandInput placeholder={title} />
          </div>
          {selectValue.size > 0 && (
            <>
              <CommandGroup>
                <div className="flex gap-2 justify-center items-center w-full">
                  <CommandItem
                    onSelect={() =>
                      column?.setFilterValue(options?.map((o) => o))
                    }
                    onClick={() => handleQueryPosition()}
                    className="text-center justify-center text-primary rounded cursor-pointer hover:opacity-60"
                  >
                    Select All
                  </CommandItem>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    onClick={() => {
                      handleQueryPosition();
                    }}
                    className="justify-center cursor-pointer text-center text-primary rounded hover:opacity-60"
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
              {options?.map((z) => {
                const isSelected = selectValue.has(z);
                return (
                  <CommandItem
                    key={z}
                    onSelect={() => {
                      if (isSelected) {
                        selectValue.delete(z);
                      } else {
                        selectValue.add(z);
                      }
                      const filterValues = Array.from(selectValue);
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined
                      );
                    }}
                    className="flex"
                  >
                    {showLabel && <span>{z}</span>}
                    <div
                      className={cn(
                        "mr-2 ml-auto flex w-4 h-4 items-center justify-center rounded-sm border border-primary",
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
              <CommandSeparator className="my-2" />
            </CommandGroup>
          </CommandList>
          <CommandGroup className="flex justify-end w-full gap-2 data-[selected=true]:bg-white p-2">
            <Button
              variant="outline"
              onClick={() => {
                column?.setFilterValue(undefined);
                setP(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="text-white bg-primary-500 hover:bg-primary-700 ml-2"
              onClick={() => handleQueryPosition()}
            >
              Apply
            </Button>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
