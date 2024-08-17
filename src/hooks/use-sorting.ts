import { useState } from "react";

export function useSorting(initialField = "id", initialOrder = "ASC") {
  const [sorting, setSorting] = useState([
    { id: initialField, desc: initialOrder === "DESC" },
  ]);
  const sortedOrder = sorting[0].desc ? "DESC" : "ASC";

  return {
    sorting,
    onSortingChange: setSorting,
    order: !sorting.length ? initialOrder : sortedOrder,
    field: sorting.length ? sorting[0].id : initialField,
  };
}
