import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useBroadcast } from './hooks/useBroadcast';
import { useRecipients } from './hooks/useRecipients';
import { useCancelBroadcast } from './hooks/useCancelBroadcast';
import { StyledCard } from '@/components/common/styled-card';
import { defaultBroadcast } from './constants';
import { LOADER_TEST_ID } from './constants';
import { Alert, AlertType } from '@/components/common/alert';
import { CallStatusTable } from './CallStatusTable';
import { AlertArea } from './AlertArea';
import { NotificationBasicinfo } from './NotificationBasicInfo';
import { Summary } from './Summary';
import { NotificationExtendedinfo } from './NotificationExtendedinfo';
import { BroadcastDetailNavigation } from './BroadcastDetailNavigation';
import { Box, CircularProgress, Grid, Typography } from '@material-ui/core';

export const BroadcastDetail = () => {
  const location = useLocation();

  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [hasDownloadReportFailed, setHasDownloadReporFailed] = useState<
    boolean
  >(false);

  const {
    data,
    loading: broadcastLoading,
    error: broadcastError,
    get: getBroadcast,
  } = useBroadcast();

  const { broadcast = defaultBroadcast } = data;

  const {
    recipients,
    meta,
    pageCount,
    loading: recipientsLoading,
    error: recipientsError,
  } = useRecipients(currentPage, rowsPerPage);

  const {
    patch: cancelBroadcast,
    response: cancelBroadcastResponse,
    loading: cancelBroadcastLoading,
    error: cancelBroadcastError,
  } = useCancelBroadcast();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const isSuccess = params.get('success');
    if (isSuccess) {
      setShowSuccess(true);
    }
  }, [location, setShowSuccess]);

  if (broadcastLoading) {
    return (
      <Box data-testid={LOADER_TEST_ID}>
        <CircularProgress />
      </Box>
    );
  }

  if (broadcastError) {
    return (
      <Alert
        alert={{
          message:
            'Sorry, something failed and we could not cancel the notification.',
          type: AlertType.ERROR,
        }}
        showReload
      />
    );
  }

  return (
    <>
      <BroadcastDetailNavigation
        broadcast={broadcast}
        meta={meta}
        cancelBroadcast={cancelBroadcast}
        cancelBroadcastLoading={cancelBroadcastLoading}
        cancelBroadcastResponse={cancelBroadcastResponse}
        getBroadcast={getBroadcast}
        setHasDownloadReporFailed={setHasDownloadReporFailed}
      />
      <Box my={3}>
        <StyledCard>
          <AlertArea
            showSuccess={showSuccess}
            recipientsError={recipientsError}
            hasDownloadReportFailed={hasDownloadReportFailed}
            cancelBroadcastError={cancelBroadcastError}
          />

          <Box px={3} pt={3}>
            <Typography variant="h4" component="h1">
              Notification Report
            </Typography>
          </Box>

          {!broadcastLoading && (
            <Grid container>
              {/* LEFT COLUMN */}
              <Grid item xs={6}>
                <Box p={3}>
                  <NotificationBasicinfo broadcast={broadcast} meta={meta} />
                  {!recipientsError && meta && meta.count && (
                    <Summary meta={meta} />
                  )}
                </Box>
              </Grid>

              {/* RIGHT COLUMN */}
              <Grid item xs={6}>
                <Box p={3}>
                  <NotificationExtendedinfo broadcast={broadcast} meta={meta} />
                  <CallStatusTable
                    recipients={recipients}
                    meta={meta}
                    loading={recipientsLoading}
                    pageCount={pageCount}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                </Box>
              </Grid>
            </Grid>
          )}
        </StyledCard>
      </Box>
    </>
  );
};
