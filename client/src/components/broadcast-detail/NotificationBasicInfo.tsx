import React, { useMemo } from 'react';
import { Box, Typography } from '@material-ui/core';
import { TextWrap } from '@/components/common/text-wrap';
import { Broadcast, BroadcastMeta, CallStatus } from '@/types';

type NotificationBasicinfoProps = {
  broadcast: Broadcast;
  meta: BroadcastMeta;
};

export const NotificationBasicinfo: React.FC<NotificationBasicinfoProps> = ({
  broadcast,
  meta,
}) => {
  const completedPercentage = useMemo<string>(() => {
    return meta.completed && meta.total
      ? `${Math.floor((meta.completed / meta.total) * 100)}%`
      : '0%';
  }, [meta.completed, meta.total]);

  const broadcastStatusString = useMemo<string>(() => {
    if (meta.broadcastStatus === CallStatus.CANCELED) {
      return 'Canceled';
    } else if (meta.broadcastStatus === CallStatus.COMPLETED) {
      return `Completed (${completedPercentage})`;
    } else if (meta.broadcastStatus === CallStatus.IN_PROGRESS) {
      return `In progress (${completedPercentage})`;
    } else {
      return '-';
    }
  }, [meta.broadcastStatus, completedPercentage]);

  return (
    <>
      <Typography variant="subtitle2" component="h2">
        Notification Name
      </Typography>
      <Box mb={2}>
        <Typography variant="subtitle1">{broadcast?.friendlyName}</Typography>
      </Box>

      <Typography variant="subtitle2" component="h2">
        From Number
      </Typography>
      <Box mb={2}>
        <Typography variant="subtitle1">{broadcast?.from}</Typography>
      </Box>

      <Typography variant="subtitle2" component="h2">
        Notification Message
      </Typography>
      <Box mb={2}>
        <Typography variant="body2">
          {broadcast.message && <TextWrap text={broadcast.message} />}
        </Typography>
      </Box>

      <Typography variant="subtitle2" component="h2">
        Notification Status
      </Typography>
      <Box mb={2}>
        <Typography variant="subtitle1">{broadcastStatusString}</Typography>
      </Box>
    </>
  );
};
