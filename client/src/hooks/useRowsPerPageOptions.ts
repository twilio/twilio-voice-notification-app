import { useEffect, useState } from 'react';

/**
 * Calculates the pagination options (number of elements per page)
 * based on the total number of elements in the list.
 * @param total
 */
export const useRowsPerPageOptions = (total?: number) => {
  const [rowsPerPageOptions, setRowsPerPageOptions] = useState<number[]>([10]);

  useEffect(() => {
    if (total) {
      if (total >= 100) {
        setRowsPerPageOptions([10, 25, 50, 100]);
      } else if (total >= 50) {
        setRowsPerPageOptions([10, 25, 50]);
      } else if (total >= 25) {
        setRowsPerPageOptions([10, 25]);
      }
    }
  }, [setRowsPerPageOptions, total]);
  return rowsPerPageOptions;
};
