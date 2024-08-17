import { Skeleton } from "../ui/skeleton";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import DepartmentDetails from "./department-detail/department-detail";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { cn } from "@/lib/utils.ts";
import { Department, ILocation, WithId } from "@/type";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  Row,
  OnChangeFn,
  PaginationState,
  Cell,
} from "@tanstack/react-table";
import { useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  location?: ILocation;
  loading: boolean;
  onOfflineExport?: () => void;
  onPaginationChange: OnChangeFn<PaginationState> | undefined;
  onSortingChange: OnChangeFn<SortingState> | undefined;
  defaultVisibility?: VisibilityState;
  pagination: PaginationState;
  sorting: SortingState;
  rowCount: number | undefined;
  className?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  location,
  loading,
  onPaginationChange,
  onSortingChange,
  onOfflineExport,
  defaultVisibility = {},
  rowCount,
  pagination,
  sorting,
}: Readonly<DataTableProps<TData, TValue>>) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>(defaultVisibility);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isUserManagePage = pathname === "/user-manage";
  const isTalentPage = pathname === "/talent";
  const isDepartmentPage = pathname === "/user-manage/department-list";
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null);

  const tableData = useMemo(
    () => (loading ? Array(15).fill({}) : data),
    [loading, data],
  );
  const tableColumns = useMemo(
    () =>
      loading
        ? columns.map((column) => ({
            ...column,
            cell: <Skeleton className="h-4 w-[80px]" />,
          }))
        : columns,
    [loading, columns],
  );

  const table = useReactTable({
    data: tableData,
    columns: tableColumns as ColumnDef<TData, TValue>[],
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    initialState: {
      pagination: {
        pageSize: 25,
        pageIndex: 2,
      },
    },
    manualPagination: true,
    enableRowSelection: true,
    keepPinnedRows: true,
    getRowId: (row) => {
      return row.id;
    },
    autoResetPageIndex: false,
    paginateExpandedRows: true,
    rowCount: rowCount,
    onPaginationChange: onPaginationChange,
    onRowSelectionChange: setRowSelection,
    onSortingChange: onSortingChange,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const handleNavigateRowsChange = (
    cell: Cell<TData, unknown>,
    row: Row<TData>,
  ) => {
    if (isUserManagePage) return;
    if (
      cell?.column.id !== "select" &&
      cell?.column.id !== "actions" &&
      isTalentPage
    ) {
      navigate(`/talent/${(row.original as WithId).id}/edit`);
    }
    if (
      cell?.column.id !== "select" &&
      cell?.column.id !== "actions" &&
      isDepartmentPage
    ) {
      const department = row.original as Department;
      openDepartmentDetails(department);
    }
  };

  const openDepartmentDetails = (department: Department) => {
    setSelectedDepartment(department);
    setIsEditOpen(true);
  };

  const tableRef = useRef(null);

  return (
    <div className="flex-1 flex h-full flex-col overflow-auto">
      <div className="mb-8">
        <DataTableToolbar
          table={table}
          location={location}
          currentTableRef={tableRef.current}
          onOfflineExport={onOfflineExport}
        />
      </div>
      <div className="rounded-t-xl flex flex-col rounded-b-0 border flex-1 overflow-auto border-meta-9">
        <Table ref={tableRef}>
          <TableHeader className="bg-lightGrey-100 sticky top-0">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className="border-b border-lightGrey-100"
                    >
                      <div className="break-keep text truncate">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="bg-white ">
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={cn({
                    "border-b border-meta-9 cursor-pointer hover:bg-meta-9 bg-white":
                      true,
                  })}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="h-12 border-b"
                      onClick={() => handleNavigateRowsChange(cell, row)}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="bg-white rounded-b-xl border border-t-0 border-meta-9">
        <DataTablePagination table={table} />
      </div>

      {selectedDepartment && (
        <DepartmentDetails
          department={selectedDepartment}
          open={isEditOpen}
          setOpen={setIsEditOpen}
        />
      )}
    </div>
  );
}
