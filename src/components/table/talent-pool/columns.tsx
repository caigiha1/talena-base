import { ColumnDef, Table } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header.tsx";
import { Talents } from "@/components/table/data/schema.ts";
import SelectCheckbox from "@/components/ui/selected-checkbox.tsx";
import { DataTableFacetedFilterPosition } from "@/components/table/talent-pool/data-table-faceted-filter-position.tsx";
import { languages, level } from "@/components/table/data/data.tsx";
import { DataTableRangeSlider } from "@/components/table/talent-pool/data-table-range-slider.tsx";
import { DataTableRadioGroup } from "@/components/table/talent-pool/data-table-radio-group.tsx";
import { DataTableFacetedFilterLanguage } from "@/components/table/talent-pool/data-table-faceted-filter-language.tsx";
import { DataTableFacetedFilterLevel } from "@/components/table/talent-pool/data-table-faceted-filter-level.tsx";
import { DataTableFacetedFilterUniversity } from "@/components/table/talent-pool/data-table-faceted-filter-university.tsx";
import { DataTableFacetedFilterSkills } from "@/components/table/talent-pool/data-table-faceted-filter-skills.tsx";
import { v4 as uuidv4 } from "uuid";
import { DataTableQueryName } from "../data-table-query-name";
import { DataTableQueryEmail } from "./data-table-query-email";

const stateBox = (table: Table<Talents>) => {
  if (table.getIsAllPageRowsSelected()) {
    return true;
  } else if (table.getIsSomePageRowsSelected()) {
    return "indeterminate";
  } else {
    return false;
  }
};

export const getTalentPoolColumns = (
  onResetPaging: () => any,
  disabledFilter: boolean = false
) => {
  const columns: ColumnDef<Talents>[] = [
    {
      id: "select",
      enableSorting: false,
      enableHiding: false,
      header: ({ table }) => {
        return (
          <SelectCheckbox
            checked={stateBox(table)}
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            ariaLabel="Select all"
          />
        );
      },
      cell: ({ row }) => {
        return (
          <SelectCheckbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            ariaLabel="Select row"
          />
        );
      },
    },
    {
      accessorKey: "name",
      enableSorting: false,
      header: ({ table }) => {
        return disabledFilter ? (
          "Name"
        ) : (
          <DataTableQueryName
            column={table.getColumn("name")}
            title="Name"
            resetPaging={onResetPaging}
          />
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[200px] truncate min-w-[160px] font-light">
              {row.original.name}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      enableSorting: false,
      header: ({ table }) => {
        return disabledFilter ? (
          "Email"
        ) : (
          <DataTableQueryEmail
            column={table.getColumn("email")}
            title="Email"
            resetPaging={onResetPaging}
          />
        );
      },
      cell: ({ row }) => (
        <div className="truncate max-w-[200px] min-w-[150px] font-light">
          {row.getValue("email")}
        </div>
      ),
    },
    {
      accessorKey: "dob",
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="DoB"
          resetPaging={onResetPaging}
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[200px] min-w-[160px] truncate font-light">
              {row.original.dob}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "phone",
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Phone Number"
          resetPaging={onResetPaging}
        />
      ),
      cell: ({ row }) => (
        <div className="truncate font-light max-w-[200px] min-w-[140px]">
          {row.getValue("phone")}
        </div>
      ),
    },
    {
      accessorKey: "position",
      enableSorting: false,
      header: ({ table }) => {
        return disabledFilter ? (
          "Position"
        ) : (
          <DataTableFacetedFilterPosition
            column={table.getColumn("position")}
            title="Position"
            showLabel={true}
            resetPaging={onResetPaging}
          />
        );
      },
      cell: ({ row }) => (
        <div className="truncate font-light max-w-[222px] min-w-[160px]">
          {row.getValue("position")}
        </div>
      ),
      filterFn: (_row, _id, value) => {
        return value;
      },
    },
    {
      accessorKey: "year_of_exp",
      enableSorting: false,
      header: () =>
        disabledFilter ? (
          "YoE"
        ) : (
          <DataTableRangeSlider title="YoE" resetPaging={onResetPaging} />
        ),
      cell: ({ row }) => (
        <div className="truncate font-light max-w-[80px] min-w-[50px]">
          {row.getValue("year_of_exp")}
        </div>
      ),
      filterFn: (_row, _id, value) => {
        return value;
      },
    },
    {
      accessorKey: "level",
      enableSorting: false,
      header: ({ table }) => {
        return disabledFilter ? (
          "Level"
        ) : (
          <DataTableFacetedFilterLevel
            column={table.getColumn("level")}
            title="Level"
            options={level}
            resetPaging={onResetPaging}
            showLabel={true}
          />
        );
      },
      cell: ({ row }) => (
        <div className="truncate font-light">{row.getValue("level")}</div>
      ),
      filterFn: (_row, _id, value) => {
        return value;
      },
    },
    {
      accessorKey: "university",
      enableSorting: false,
      header: ({ table }) => {
        return disabledFilter ? (
          "University"
        ) : (
          <DataTableFacetedFilterUniversity
            column={table.getColumn("university")}
            title="University"
            showLabel={true}
            resetPaging={onResetPaging}
          />
        );
      },
      cell: ({ row }) => {
        return (
          <div className="truncate font-light min-w-[200px]">
            {row.getValue("university")}
          </div>
        );
      },
      filterFn: (_row, _id, value) => {
        return value;
      },
    },
    {
      accessorKey: "gpa",
      enableSorting: false,
      header: () => {
        return disabledFilter ? (
          "GPA"
        ) : (
          <DataTableRadioGroup title="GPA" resetPaging={onResetPaging} />
        );
      },
      cell: ({ row }) => {
        const gpa = row.getValue("gpa") as string;
        const displayGPA = (): string => {
          if (gpa === undefined || gpa === null || gpa === "") return "";
          const gpaNumber = parseFloat(gpa);
          return gpaNumber > 4.0 ? gpa : `${gpa} / 4.0`;
        };

        return <div className="truncate font-light">{displayGPA()}</div>;
      },
      filterFn: (_row, _id, value) => {
        return value;
      },
    },
    {
      accessorKey: "languages",
      enableSorting: false,
      header: ({ table }) => {
        return disabledFilter ? (
          "Languages"
        ) : (
          <DataTableFacetedFilterLanguage
            column={table.getColumn("languages")}
            title="Languages"
            options={languages}
            showLabel={true}
            resetPaging={onResetPaging}
          />
        );
      },
      cell: ({ row }) => {
        const languages: Array<string> = row.getValue("languages");

        return (
          <div className="truncate font-light max-w-[200px]">
            {languages.map((lang, index) => (
              <span key={uuidv4()}>
                {lang}
                {index < languages.length - 1 && ", "}
              </span>
            ))}
          </div>
        );
      },
      filterFn: (_row, _id, value) => {
        return value;
      },
    },
    {
      accessorKey: "skills",
      enableSorting: false,
      header: ({ table }) => {
        return disabledFilter ? (
          "Skills"
        ) : (
          <DataTableFacetedFilterSkills
            column={table.getColumn("skills")}
            title="Skills"
            showLabel={true}
            resetPaging={onResetPaging}
          />
        );
      },
      cell: ({ row }) => {
        const skills = row.getValue("skills") as string[];
        return (
          <div className="truncate font-light max-w-[200px]">
            {skills?.join(", ")}
          </div>
        );
      },
      filterFn: (_row, _id, value) => {
        return value;
      },
    },
  ];
  return columns;
};
