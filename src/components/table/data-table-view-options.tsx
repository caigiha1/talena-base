import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Column, Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu.tsx";
import { ViewTableIcon } from "@/common/Icon.tsx";
import React from "react";
import { cn } from "@/lib/utils.ts";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
  currentTableRef: React.MutableRefObject<null> | null;
}

export function DataTableViewOptions<TData>({
  table,
}: Readonly<DataTableViewOptionsProps<TData>>) {
  const isColumnDisabled = (column: Column<TData>) => {
    return column.id === "name" || column.id === "email";
  };
  const handleCheckedChange = (column: Column<TData>, value: boolean) => {
    if (!isColumnDisabled(column)) {
      column.toggleVisibility(value);
    }
    // Optionally handle disabled state feedback here
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="ml-auto hidden lg:flex border-lightGrey-200"
        >
          <ViewTableIcon className="mr-2 h-4 w-4" />
          <span className="font-semibold text-sm">View</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[263px] bg-white border-lightGrey-200 shadow p-2"
      >
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide()
          )
          .map((column) => {
            const label = (() => {
              switch (column.id) {
                case "phone":
                  return "Phone Number";
                case "year_of_exp":
                  return "YoE";
                case "dob":
                  return "DoB";
                case "gpa":
                  return "GPA";
                default:
                  return column.id
                    .split("_")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ");
              }
            })();

            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className={cn({
                  capitalize: true,
                  "data-[state=checked]:bg-lightGrey-400 data-[state=checked]:text-white":
                    column.getCanSort(),
                })}
                checked={column.getIsVisible()}
                onCheckedChange={(value) =>
                  handleCheckedChange(column, !!value)
                }
                disabled={column.getCanSort()}
              >
                <p className="text-sm text-lightGrey-900 font-normal">
                  {label}
                </p>
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
