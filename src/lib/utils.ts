import { Column, Row, Table } from "@tanstack/react-table";
import { type ClassValue, clsx } from "clsx";
import { format, isValid, parse, parseISO } from "date-fns";
import { twMerge } from "tailwind-merge";
import { CellObject, utils, WorkBook, writeFile } from "xlsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getApiUrl = (url: string) =>
  `${import.meta.env.VITE_BASE_URL}/${url}`;

export function bytesToSize(bytes: number): string {
  const sizes: string[] = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "n/a";
  const i: number = parseInt(
    Math.floor(Math.log(bytes) / Math.log(1024)).toString(),
  );
  if (i === 0) return `${bytes} ${sizes[i]}`;
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
}

export function formatDate(dateStr: string) {
  if (!dateStr) {
    return "N/a";
  }

  if (dateStr.toLowerCase() === "present") {
    return "Present";
  }

  let parsedDate;

  // Try to parse ISO format directly first
  if (dateStr.includes("-")) {
    parsedDate = parseISO(dateStr);
  }

  // If parsing as ISO fails, try to parse with custom formats
  if (!isValid(parsedDate)) {
    // Normalize single-digit months (e.g., 2022-1 -> 2022-01)
    const normalizedDate = dateStr.replace(/(\d{4})-(\d)$/, "$1-0$2");
    parsedDate = parse(normalizedDate, "yyyy-MM", new Date());
  }

  // If parsing "yyyy-MM" fails, try to parse "MM/yyyy"
  if (!isValid(parsedDate)) {
    parsedDate = parse(dateStr, "MM/yyyy", new Date());
  }

  // Check if the parsed date is valid
  if (!isValid(parsedDate)) {
    return "N/a";
  }

  // Format the parsed date to "MMMM yyyy"
  return format(parsedDate as Date, "MMMM yyyy");
}

export const exportToExcel = <TData>(table: Table<TData>) => {
  const formatCellValue = (value: TData) => {
    if (value === null) {
      return "";
    }

    if (Array.isArray(value)) {
      return value.join(", ");
    }

    if (typeof value === "object") {
      return JSON.stringify(value);
    }

    return value;
  };

  const visibleColumns = table
    .getAllColumns()
    .filter(
      (column: Column<TData, unknown>) =>
        column.getIsVisible() && column.id !== "select",
    );

  const header = visibleColumns.map(
    (column: Column<TData, unknown>) => column.id,
  );

  const selectedRows = table.getSelectedRowModel().rows;

  let data;

  if (selectedRows.length > 0) {
    data = selectedRows.map((row: Row<TData>) => {
      const rowData: { [key: string]: string | TData } = {};
      visibleColumns.forEach((column: Column<TData, unknown>) => {
        const value = row.getValue(column.id);
        rowData[column.id] = formatCellValue(value as TData);
      });
      return rowData;
    });
  } else {
    const allRows = table.getRowModel().rows;
    data = allRows.map((row: Row<TData>) => {
      const rowData: { [key: string]: string | TData } = {};
      visibleColumns.forEach((column: Column<TData, unknown>) => {
        const value = row.getValue(column.id);
        rowData[column.id] = formatCellValue(value as TData);
      });
      return rowData;
    });
  }

  const worksheetData = [
    header,
    ...data.map((row) => header.map((col) => row[col])),
  ];

  const worksheet = utils.aoa_to_sheet(worksheetData);
  const workbook: WorkBook = utils.book_new();

  const columnWidths = worksheetData[0].map((_, colIndex) => {
    return worksheetData.reduce((maxWidth, row) => {
      const cell = row[colIndex];
      const cellLength = cell ? cell.toString().length : 0;
      return Math.max(maxWidth, cellLength);
    }, 10);
  });

  worksheet["!cols"] = columnWidths.map((width) => ({ wch: width }));
  const headerRow = worksheetData[0];
  headerRow.forEach((_header, index) => {
    const cellAddress = utils.encode_cell({ c: index, r: 0 });
    const cell: CellObject = worksheet[cellAddress];
    if (cell) {
      cell.s = {
        font: {
          bold: true,
        },
      };
    }
  });
  utils.book_append_sheet(workbook, worksheet, "Sheet1");
  const fileName = `table-data-${new Date().toISOString().split("T")[0]}.xlsx`;

  writeFile(workbook, fileName);
};

export function generateExcel<TData>(
  data: TData[] | undefined,
  fileName: string,
  excludeFields: (keyof TData)[],
) {
  const filterFields = (row: TData): Partial<TData> => {
    const filteredRow: Partial<TData> = { ...row };
    excludeFields.forEach((field) => {
      delete filteredRow[field];
    });
    return filteredRow;
  };
  const filteredData = data?.map(filterFields);
  const worksheet = utils.json_to_sheet(filteredData as TData[]);
  const workbook: WorkBook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, "Sheet1");
  const columnWidths = worksheet["!cols"] || [];
  Object.keys(worksheet).forEach((cellAddress) => {
    const cell = worksheet[cellAddress];
    if (cell.v) {
      const colIndex = utils.decode_cell(cellAddress).c;
      const cellLength = cell.v.toString().length;
      if (!columnWidths[colIndex]) {
        columnWidths[colIndex] = { wpx: cellLength * 10 };
      } else {
        columnWidths[colIndex].wpx = Math.max(
          columnWidths[colIndex].wpx as number,
          cellLength * 10,
        );
      }
    }
  });
  worksheet["!cols"] = columnWidths;

  const headerCells = Object.keys(filteredData?.[0] ?? {}).map(
    (_key, index) => ({
      c: index,
      r: 0,
    }),
  );

  headerCells.forEach(({ c, r }) => {
    const cellAddress = utils.encode_cell({ c, r });
    const cell: CellObject = worksheet[cellAddress];
    if (cell) {
      cell.s = {
        font: {
          bold: true,
        },
      };
    }
  });

  writeFile(workbook, `${fileName}.xlsx`);
}
