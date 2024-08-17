import { Column } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ChevronDownIcon, Icons, SortIcon } from "@/common/Icon.tsx";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useState } from "react";
import { setQueryOderingUser } from "@/redux/slices/user-manager-slice";
import { CheckIcon } from "lucide-react";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  resetPaging: () => any;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
  resetPaging,
}: Readonly<DataTableColumnHeaderProps<TData, TValue>>) {
  const dispatch = useAppDispatch();
  const queryOrderingUser = useAppSelector(
    (state) => state.userManager.ordering
  );
  const [selectedQuery, setSelectedQuery] = useState<string | null>(
    queryOrderingUser || null
  );
  const queryAtoZ = "first_name";
  const queryZtoA = "-first_name";

  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  function getIcon() {
    if (column.getIsSorted() === "desc") {
      return <Icons.FilterIcon />;
    } else if (column.getIsSorted() === "asc") {
      return <Icons.FilterIcon />;
    } else {
      return <ChevronDownIcon className="h-2.5 w-2.5" />;
    }
  }

  const handleQueryAtoZ = () => {
    dispatch(setQueryOderingUser(queryAtoZ as string));
    setSelectedQuery(queryAtoZ);
    resetPaging();
  };

  const handleQueryZtoA = () => {
    dispatch(setQueryOderingUser(queryZtoA as string));
    setSelectedQuery(queryZtoA);
    resetPaging();
  };

  return (
    <div className={cn("flex items-center space-x-2 w-full", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 whitespace-nowrap flex flex-grow justify-between data-[state=open]:bg-accent"
          >
            <span className="text-sm font-semibold">{title}</span>
            {getIcon()}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white border-none">
          <DropdownMenuItem onClick={() => handleQueryAtoZ()} className="gap-2">
            <SortIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />A
            to Z
            {selectedQuery === queryAtoZ && (
              <CheckIcon className="w-5 h-5 text-primary-500 ml-auto" />
            )}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleQueryZtoA()} className="gap-2">
            <SortIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />Z
            to A
            {selectedQuery === queryZtoA && (
              <CheckIcon className="w-5 h-5 text-primary-500 ml-auto" />
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
