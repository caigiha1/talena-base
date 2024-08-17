import { ChevronDownIcon } from "@/common/Icon.tsx";
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
import {
  selectDepartmentManager,
  setQueryDepartmentManager,
} from "@/redux/slices/user-manager-slice.ts";
import { useAppDispatch, useAppSelector } from "@/redux/store.ts";
import { CheckIcon } from "@radix-ui/react-icons";
import { Column } from "@tanstack/react-table";
import { useState } from "react";

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  showLabel?: boolean;
  resetPaging: () => any;
}

export function DataTableFacetedFilterDepartment<TData, TValue>({
  column,
  title,
  showLabel = true,
  resetPaging,
}: Readonly<DataTableFacetedFilterProps<TData, TValue>>) {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const selectValue = new Set(column?.getFilterValue() as string[]);
  const options = useAppSelector(selectDepartmentManager);
  const uniqueById = Array.from(
    new Map(options?.map((item) => [item?.id, item])).values()
  );

  const handleQueryDepart = () => {
    dispatch(setQueryDepartmentManager(column?.getFilterValue() as string[]));
    setOpen(false);
    resetPaging();
  };

  return (
    <Popover
      open={open}
      onOpenChange={() => {
        setOpen((open) => !open);
      }}
    >
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
          <div className="px-2 py-2">
            <CommandInput placeholder={title} />
          </div>
          {selectValue.size > 0 && (
            <>
              <CommandGroup>
                <div className="flex items-center justify-center w-full gap-2">
                  <CommandItem
                    onSelect={() =>
                      column?.setFilterValue(uniqueById?.map((o) => o?.id))
                    }
                    onClick={() => handleQueryDepart()}
                    className="justify-center text-center text-primary rounded cursor-pointer hover:opacity-60"
                  >
                    Select All
                  </CommandItem>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    onClick={() => {
                      handleQueryDepart();
                    }}
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
              {uniqueById?.map((option) => {
                const isSelected = selectValue.has(option?.id);
                return (
                  <CommandItem
                    key={option?.id}
                    onSelect={() => {
                      if (isSelected) {
                        selectValue.delete(option?.id);
                      } else {
                        selectValue.add(option?.id);
                      }
                      const filterValues = Array.from(selectValue);
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined
                      );
                    }}
                    className="flex"
                  >
                    {showLabel && <span>{option?.name}</span>}
                    <div
                      className={cn(
                        "mr-2 ml-auto flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
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
          <CommandGroup className="flex justify-end w-full gap-2 data-[selected=true]:bg-white">
            <Button
              variant="outline"
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="text-white bg-primary-500 hover:bg-primary-700"
              onClick={() => handleQueryDepart()}
            >
              Apply
            </Button>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
