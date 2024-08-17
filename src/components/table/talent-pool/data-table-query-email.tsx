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

interface DataTableQueryEmailProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  resetPaging: () => any;
}

export function DataTableQueryEmail<TData, TValue>({
  column,
  title,
  resetPaging,
}: Readonly<DataTableQueryEmailProps<TData, TValue>>) {
  const dispatch = useAppDispatch();
  const queryOrderingEmail = useAppSelector(
    (state) => state.talentPool.queryOrdering
  );

  const [selectedQueryEmail, setSelectedQueryEmail] = useState<string | null>(
    queryOrderingEmail || null
  );
  const queryEmailAtoZ = "email";
  const queryEmailZtoA = "-email";

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
    dispatch(setQueryOrdering(queryEmailAtoZ as string));
    setSelectedQueryEmail(queryEmailAtoZ);
    resetPaging();
  };

  const handleQueryZtoA = () => {
    dispatch(setQueryOrdering(queryEmailZtoA as string));
    setSelectedQueryEmail(queryEmailAtoZ);
    resetPaging();
  };

  return (
    <div className="flex space-x-2 items-center w-full">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 flex flex-grow justify-between whitespace-nowrap data-[state=open]:bg-accent cursor-pointer"
          >
            <span className="font-semibold text-sm">{title}</span>
            {getIcon()}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="border-none bg-white">
          <Command className="w-40 flex">
            <CommandList>
              <CommandGroup>
                <CommandItem
                  onSelect={() => handleQueryAtoZ()}
                  className="cursor-pointer gap-2"
                >
                  <SortIcon className="mr-2 text-muted-foreground/70 h-3.5 w-3.5" />
                  A to Z
                  {selectedQueryEmail === queryEmailAtoZ && (
                    <CheckIcon className="w-5 h-5 text-primary-500 ml-auto" />
                  )}
                </CommandItem>
                <CommandItem
                  onSelect={() => handleQueryZtoA()}
                  className="cursor-pointer gap-2"
                >
                  <SortIcon className="mr-2 text-muted-foreground/70 h-3.5 w-3.5" />
                  Z to A
                  {selectedQueryEmail === queryEmailZtoA && (
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
