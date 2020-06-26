import { Box, Typography } from '@material-ui/core';
import React, { useMemo } from 'react';
import { Broadcast, BroadcastMeta } from '@/types';

type ExtendedInfoProps = {
  broadcast: Broadcast;
  meta: BroadcastMeta;
};

export const NotificationExtendedinfo: React.FC<ExtendedInfoProps> = ({
  broadcast,
  meta,
}) => {
  const creationDateString = useMemo<string>(() => {
    return broadcast?.dateCreated
      ? new Date(broadcast.dateCreated).toLocaleString()
      : '-';
  }, [broadcast]);

  const endDateString = useMemo<string>(() => {
    return broadcast?.endDate
      ? new Date(broadcast.endDate).toLocaleString()
      : meta.completed === meta.total
      ? new Date().toLocaleString()
      : '-';
  }, [broadcast, meta]);

  return (
    <>
      <Typography variant="subtitle2" component="h2">
        Start time
      </Typography>
      <Box mb={2}>
        <Typography variant="subtitle1">{creationDateString}</Typography>
      </Box>

      <Typography variant="subtitle2" component="h2">
        End time
      </Typography>
      <Box mb={2}>
        <Typography variant="subtitle1">{endDateString}</Typography>
      </Box>

      <Typography variant="subtitle2" component="h2">
        Recipients
      </Typography>
      <Box mb={2}>
        <Typography variant="subtitle1">
          {meta.total} Total Recipients
        </Typography>
      </Box>
    </>
  );
};
