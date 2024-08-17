import { useState } from "react";

export function usePagination(initialSize = 15) {
  const [pagination, setPagination] = useState({
    pageSize: Number(localStorage.getItem("pageSize")) || initialSize,
    pageIndex: Number(localStorage.getItem("pageIndex")) || 0,
  });
  const { pageSize, pageIndex } = pagination;
  const resetPagination = () => {
    setPagination({
      pageIndex: 0,
      pageSize: pagination.pageSize,
    });
  };
  return {
    // Table State
    onPaginationChange: setPagination,
    pagination,
    // API
    limit: pageSize,
    skip: pageIndex + 1,
    resetPagination,
  };
}
