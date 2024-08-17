import { Column } from "@tanstack/react-table";
import { Button } from "@/components/ui/button.tsx";
import { useAppDispatch, useAppSelector } from "@/redux/store.ts";
import { setQueryOrdering } from "@/redux/slices/talent-pool-slice.ts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon, Icons, SortIcon } from "@/common/Icon";
import { CheckIcon } from "lucide-react";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useState } from "react";

interface DataTableQueryNameProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  resetPaging: () => any;
}

export function DataTableQueryName<TData, TValue>({
  column,
  title,
  resetPaging,
}: Readonly<DataTableQueryNameProps<TData, TValue>>) {
  const dispatch = useAppDispatch();
  const queryOrderingName = useAppSelector(
    (state) => state.talentPool.queryOrdering
  );

  const [selectedQueryName, setSelectedQueryName] = useState<string | null>(
    queryOrderingName || null
  );
  const queryNameAtoZ = "name";
  const queryNameZtoA = "-name";

  function getIcon() {
    if (column?.getIsSorted() === "desc") {
      return <Icons.FilterIcon />;
    } else if (column?.getIsSorted() === "asc") {
      return <Icons.FilterIcon />;
    } else {
      return <ChevronDownIcon className="h-2.5 w-2.5" />;
    }
  }

  const handleQueryAtoZ = () => {
    dispatch(setQueryOrdering(queryNameAtoZ as string));
    setSelectedQueryName(queryNameAtoZ);
    resetPaging();
  };

  const handleQueryZtoA = () => {
    dispatch(setQueryOrdering(queryNameZtoA as string));
    setSelectedQueryName(queryNameZtoA);
    resetPaging();
  };

  return (
    <div className="flex items-center space-x-2 w-full">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 whitespace-nowrap flex flex-grow justify-between data-[state=open]:bg-accent cursor-pointer"
          >
            <span className="text-sm font-semibold">{title}</span>
            {getIcon()}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white border-none">
          <Command className="flex w-40">
            <CommandList>
              <CommandGroup>
                <CommandItem
                  onSelect={() => handleQueryAtoZ()}
                  className="gap-2 cursor-pointer"
                >
                  <SortIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                  A to Z
                  {selectedQueryName === queryNameAtoZ && (
                    <CheckIcon className="w-5 h-5 text-primary-500 ml-auto" />
                  )}
                </CommandItem>
                <CommandItem
                  onSelect={() => handleQueryZtoA()}
                  className="gap-2 cursor-pointer"
                >
                  <SortIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                  Z to A
                  {selectedQueryName === queryNameZtoA && (
                    <CheckIcon className="w-5 h-5 text-primary-500 ml-auto" />
                  )}
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
