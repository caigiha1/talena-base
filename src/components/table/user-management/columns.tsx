import { DataTableColumnHeader } from "@/components/table/data-table-column-header.tsx";
import { DataTableFacetedFilter } from "@/components/table/data-table-faceted-filter.tsx";
import { DataTableRowActions } from "@/components/table/data-table-row-actions.tsx";
import { badges } from "@/components/table/data/data.tsx";
import { Users } from "@/components/table/data/schema.ts";
import { Badge } from "@/components/ui/badge.tsx";
import SelectCheckbox from "@/components/ui/selected-checkbox.tsx";
import { cn } from "@/lib/utils.ts";
import { ColumnDef, Table } from "@tanstack/react-table";
import { DataTableFacetedFilterDepartment } from "@/components/table/user-management/data-table-faceted-filter-department.tsx";

const stateBox = (table: Table<Users>) => {
  if (table.getIsAllPageRowsSelected()) {
    return true;
  } else if (table.getIsSomePageRowsSelected()) {
    return "indeterminate";
  } else {
    return false;
  }
};

export const getUserColumns = (onResetPaging: () => any) => {
  const columns: ColumnDef<Users>[] = [
    {
      id: "select",
      enableSorting: false,
      enableHiding: false,
      header: ({ table }) => {
        return (
          <div className="pl-3">
            <SelectCheckbox
              checked={stateBox(table)}
              onCheckedChange={(value) =>
                table.toggleAllPageRowsSelected(!!value)
              }
              ariaLabel="Select all"
            />
          </div>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="pl-3">
            <SelectCheckbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              ariaLabel="Select row"
            />
          </div>
        );
      },
    },
    {
      accessorKey: "first_name",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Name"
          resetPaging={onResetPaging}
        />
      ),
      cell: ({ row }) => (
        <div className="truncate font-light">
          {row?.original?.first_name} {row?.original?.last_name}
        </div>
      ),
      enableHiding: false,
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Email"
          resetPaging={onResetPaging}
        />
      ),
      cell: ({ row }) => (
        <div className="truncate font-light">{row.getValue("email")}</div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "department",
      header: ({ table }) => {
        return (
          <DataTableFacetedFilterDepartment
            column={table.getColumn("department")}
            title="Department"
            showLabel={true}
            resetPaging={onResetPaging}
          />
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-light">
              {row.original.department?.name}
            </span>
          </div>
        );
      },
      filterFn: (_row, _id, value) => {
        return value;
      },
    },
    {
      accessorKey: "role",
      header: ({ table }) => (
        <DataTableFacetedFilter
          column={table.getColumn("role")}
          title="Roles"
          options={badges}
          showLabel={true}
          resetPaging={onResetPaging}
        />
      ),
      cell: ({ row }) => {
        const roles = row?.original?.role;
        let roleInitial = "";

        switch (roles) {
          case "ADMIN":
            roleInitial = "Admin";
            break;
          case "HIRING_MANAGER":
            roleInitial = "Hiring Manager";
            break;
          case "INTERVIEWER":
            roleInitial = "Interviewer";
            break;
          case "RECRUITER":
            roleInitial = "Recruiter";
            break;
          case "RECRUITER_LEAD":
            roleInitial = "Recruiter Lead";
            break;
          default:
            roleInitial = roles.charAt(0).toUpperCase();
            break;
        }
        return (
          <Badge
            className={cn({
              "border-transparent bg-badge-green hover:bg-badge-green/80 text-badgeText-green":
                roles === "ADMIN",
              "border-transparent bg-badge-blue hover:bg-badge-blue/80 text-badgeText-blue":
                roles === "HIRING_MANAGER",
              "border-transparent bg-badge-orange hover:bg-badge-orange/80 text-badgeText-orange":
                roles === "INTERVIEWER",
              "border-transparent bg-badge-pink hover:bg-badge-pink/80 text-badgeText-pink":
                roles === "RECRUITER",
              "bg-badge-purple border-transparent hover:bg-badge-purple/80 text-badgeText-purple":
                roles === "RECRUITER_LEAD",
            })}
          >
            {roleInitial}
          </Badge>
        );
      },
      filterFn: (_row, _id, value) => {
        return value;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-end justify-end pr-3">
          <DataTableRowActions row={row} />
        </div>
      ),
    },
  ];
  return columns;
};
