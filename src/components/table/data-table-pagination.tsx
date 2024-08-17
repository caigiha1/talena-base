import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: Readonly<DataTablePaginationProps<TData>>) {
  const pageCount = table.getPageCount();
  const pageIndex = table.getState().pagination.pageIndex;

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 0; i < pageCount; i++) {
      pageNumbers.push(i + 1);
    }
    return pageNumbers;
  };
  const pageSizes = [15, 25, 35, 45, 55];

  const pageSize = table.getState().pagination.pageSize;
  const rowCount = table.getRowCount();
  const startIndex = pageIndex * pageSize + 1;
  const endIndex = Math.min((pageIndex + 1) * pageSize, rowCount);

  return (
    <div className="flex basis-full items-center px-2 py-2 w-full">
      <div className="hidden sm:flex items-center justify-between gap-2">
        <p className="text-muted-foreground text-sm font-medium text-wrap">
          Showing {startIndex} to {endIndex} of {rowCount} results.
        </p>
        <div className="flex items-center justify-between gap-2">
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
              table.setPageIndex(0);
              localStorage.setItem("pageSize", value);
            }}
          >
            <SelectTrigger className="h-8 w-[70px] border border-meta-9">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top" className="bg-white">
              {pageSizes.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm font-light">Items per page</p>
        </div>
      </div>

      <span className="flex w-[100px] items-center justify-center text-sm font-medium">{`Page ${
        table.getState().pagination.pageIndex + 1
      } of ${table.getPageCount()}`}</span>
      <div className="flex ml-auto items-center space-x-2">
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex border-meta-9"
          onClick={(e) => {
            e.preventDefault();
            table.setPageIndex(0);
          }}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Go to first page</span>
          <DoubleArrowLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0 border-meta-9"
          onClick={(e) => {
            e.preventDefault();
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Go to previous page</span>
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        {getPageNumbers().map((pageNumber, index) => {
          if (
            index === 0 ||
            index === pageCount - 1 ||
            Math.abs(pageIndex - index) <= 1
          ) {
            return (
              <Button
                key={pageNumber}
                variant="outline"
                className={`h-8 w-8 p-0 ${
                  pageIndex + 1 === pageNumber
                    ? "bg-primary-500 text-white"
                    : "text-black"
                } border-meta-9 `}
                onClick={(e) => {
                  e.preventDefault();
                  table.setPageIndex(pageNumber - 1);
                  localStorage.setItem("pageIndex", String(pageNumber - 1));
                }}
              >
                {pageNumber}
              </Button>
            );
          } else if (
            (index === 1 && pageIndex > 2) ||
            (index === pageCount - 2 && pageIndex < pageCount - 3)
          ) {
            return <span key="ellipsis">...</span>;
          } else {
            return null;
          }
        })}
        <Button
          variant="outline"
          className="h-8 w-8 p-0 border-meta-9"
          onClick={(e) => {
            e.preventDefault();
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Go to next page</span>
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex border-meta-9"
          onClick={(e) => {
            e.preventDefault();
            table.setPageIndex(table.getPageCount() - 1);
          }}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Go to last page</span>
          <DoubleArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
