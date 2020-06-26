import React, { useMemo } from 'react';
import { useNumbersTableStyles, StyledTableCell } from './styles';
import { usePagination } from '@/hooks/usePagination';

import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from '@material-ui/core';

export type NumbersTableProps = {
  headers: string[];
  rows: string[];
  data: any[];
};

export const NumbersTable: React.FC<NumbersTableProps> = ({
  headers,
  rows,
  data,
}) => {
  const classes = useNumbersTableStyles();
  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    paginatedData,
    rowsPerPageOptions,
  } = usePagination(data);

  const rowCells = useMemo(() => {
    return paginatedData.map(
      (rowData: { [key: string]: string }, idx: number) => (
        <TableRow key={idx}>
          {rows.map((cell: string, index: number) => (
            <TableCell key={`${idx}-${index}`}>{rowData[cell]}</TableCell>
          ))}
        </TableRow>
      )
    );
  }, [paginatedData, rows]);

  return (
    <>
      <TableContainer component={Box} className={classes.tableContainer}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              {headers.map((title: string, idx: number) => (
                <StyledTableCell key={idx}>{title}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{rowCells}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};
