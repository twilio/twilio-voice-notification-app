import React, { useCallback } from 'react';
import { PAGINATOR_TEST_ID, RECIPIENTS_TABLE_TEST_ID } from './constants';
import { BroadcastMeta, Call } from '@/types';
import { Setter } from '@/types/setter';
import { useRowsPerPageOptions } from '@/hooks/useRowsPerPageOptions';

import {
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core';

type CallStatusTableProps = {
  recipients: Call[];
  meta: BroadcastMeta;
  loading: boolean;
  pageCount: number;
  rowsPerPage: number;
  setRowsPerPage: Setter<number>;
  currentPage: number;
  setCurrentPage: Setter<number>;
};

export const CallStatusTable: React.FC<CallStatusTableProps> = ({
  recipients,
  meta,
  loading,
  pageCount,
  rowsPerPage,
  setRowsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const rowsPerPageOptions = useRowsPerPageOptions(meta?.total);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const rows = parseInt(event.target.value, 10);
      setRowsPerPage(rows);
      setCurrentPage(0);
    },
    [setRowsPerPage, setCurrentPage]
  );

  const onChangePagination = useCallback(
    (event: unknown, value: number) => {
      setCurrentPage(value);
    },
    [setCurrentPage]
  );

  return (
    <>
      {recipients && recipients.length > 0 && (
        <>
          <TableContainer
            component={Paper}
            style={{
              marginBottom: loading ? '0' : '4px',
            }}
          >
            <Table
              aria-label="Notification recipients calls details and statuses"
              size="small"
              data-testid={RECIPIENTS_TABLE_TEST_ID}
            >
              <TableHead>
                <TableRow>
                  <TableCell>Number</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recipients?.map((recipient) => (
                  <TableRow key={recipient.callSid}>
                    <TableCell>{recipient.to}</TableCell>
                    <TableCell>{recipient.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {loading && <LinearProgress />}
        </>
      )}
      {pageCount > 0 && meta.total && (
        <TablePagination
          data-testid={PAGINATOR_TEST_ID}
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          page={currentPage}
          count={meta.total}
          rowsPerPage={rowsPerPage}
          onChangePage={onChangePagination}
          onChangeRowsPerPage={onChangeRowsPerPage}
        />
      )}
    </>
  );
};
