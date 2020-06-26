import React, { useCallback, useState } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import useFetch from 'use-http';
import useStyles from './styles';
import { Add } from '@material-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { GreyContainer } from '@/components/common/containers';
import { NotificationItem } from './NotificationItem';
import { StyledCard } from '@/components/common/styled-card';
import { Broadcast } from '@/types';
import { Alert, AlertType } from '@/components/common/alert';
import { Box, Button, CircularProgress, Typography } from '@material-ui/core';
import { LOADER_TEST_ID, REQUIREMENTS } from './constants';

const alert = {
  message:
    'Sorry, we could not retrieve your voice notifications history. Please try again',
  type: AlertType.ERROR,
};

export const BroadcastList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const classes = useStyles();

  const { data, loading, error } = useFetch(
    `/api/broadcasts?page=${currentPage - 1}`,
    {
      method: 'GET',
      data: { broadcasts: [], pageCount: 0 },
    },
    [currentPage]
  );

  const {
    broadcasts,
    pageCount,
  }: { broadcasts: Broadcast[]; pageCount: number } = data;

  const onPaginationChange = useCallback(
    (event: React.ChangeEvent<unknown>, value: number) => {
      setCurrentPage(value);
    },
    [setCurrentPage]
  );

  return (
    <StyledCard className={classes.root}>
      <Box display="flex" flexDirection="row">
        <Box flexGrow="1">
          <Typography variant="h4" component="h1">
            My Voice Notifications
          </Typography>
          <Typography className={classes.subtitle}>
            Review all of your voice notifications and access reports
          </Typography>
        </Box>
        <Box>
          <Button
            component={RouterLink}
            to="/create"
            color="primary"
            variant="contained"
            className={classes.createButton}
            startIcon={<Add />}
          >
            New Voice Notification
          </Button>
        </Box>
      </Box>
      {loading && (
        <Box data-testid={LOADER_TEST_ID}>
          <CircularProgress />
        </Box>
      )}
      {error && <Alert alert={alert} showReload={true} />}
      {!error && !loading && broadcasts?.length > 0 && (
        <>
          {broadcasts.map(
            ({
              broadcastId,
              friendlyName,
              dateCreated,
              canceled,
              completed,
            }) => (
              <NotificationItem
                key={broadcastId}
                friendlyName={friendlyName}
                broadcastId={broadcastId}
                dateCreated={dateCreated}
                canceled={canceled}
                completed={completed}
              />
            )
          )}
          {pageCount > 1 && (
            <Box
              margin={4}
              display="flex"
              flexDirection="row"
              justifyContent="center"
            >
              <Pagination
                count={pageCount}
                page={currentPage}
                onChange={onPaginationChange}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
      {!error && !loading && broadcasts?.length === 0 && (
        <GreyContainer>
          You haven't created any voice notification yet. You can create your
          first voice notification in 3 easy steps, only be sure to have the
          following
          <ul>
            {REQUIREMENTS.map((requirement, i) => (
              <li key={i}>{requirement}</li>
            ))}
          </ul>
        </GreyContainer>
      )}
    </StyledCard>
  );
};
