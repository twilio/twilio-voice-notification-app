import { useState, useCallback, useMemo, useEffect } from 'react';
import { useRowsPerPageOptions } from '@/hooks/useRowsPerPageOptions';

/**
 * All around hook for paginating a collection of data client side.
 * @param data List of elements to paginate
 */
export const usePagination = (data: any[]) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const rowsPerPageOptions = useRowsPerPageOptions(data.length);

  const handleChangePage = useCallback(
    (event, newPage) => {
      setPage(newPage);
    },
    [setPage]
  );

  const handleChangeRowsPerPage = useCallback(
    (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    },
    [setPage, setRowsPerPage]
  );

  const paginatedData = useMemo(() => {
    return data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [data, page, rowsPerPage]);

  useEffect(() => {
    setPage(0);
  }, [data]);

  return {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    paginatedData,
    rowsPerPageOptions,
  };
};
