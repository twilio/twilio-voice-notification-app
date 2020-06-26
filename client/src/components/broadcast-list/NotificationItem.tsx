import { notificationItemStyles as useStyles } from './styles';
import { Box, Button, Paper, Typography } from '@material-ui/core';
import React, { useMemo } from 'react';
import { CallStatus } from '@/types';

type NotificationItemType = {
  broadcastId: string;
  friendlyName: string;
  dateCreated: Date;
  completed: boolean;
  canceled: boolean;
};

export const NotificationItem = ({
  broadcastId,
  friendlyName,
  dateCreated,
  completed,
  canceled,
}: NotificationItemType) => {
  const status = useMemo(() => {
    return canceled
      ? CallStatus.CANCELED
      : completed
      ? CallStatus.COMPLETED
      : CallStatus.IN_PROGRESS;
  }, [canceled, completed]);

  const classes = useStyles({ status });

  return (
    <Paper elevation={2} key={broadcastId} className={classes.listItem}>
      <Box display="flex" flexDirection="row" p={2}>
        <Box flexGrow="1" display="flex" flexDirection="column">
          <Box fontSize={18} fontWeight={500}>
            {friendlyName}
          </Box>
          <Typography variant="caption">
            {new Date(dateCreated).toLocaleDateString()} ·{' '}
            <span className={classes.notificationStatus}>{status}</span>
          </Typography>
        </Box>
        <Button
          variant="outlined"
          color="primary"
          href={`/broadcasts/${broadcastId}`}
        >
          VIEW REPORT
        </Button>
      </Box>
    </Paper>
  );
};
