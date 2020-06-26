import React from 'react';
import { Alert as MUIAlert } from '@material-ui/lab';
import { AlertType } from '@/components/common/alert';
import { BroadcastMeta, CallStatus, Count } from '@/types';

import {
  Box,
  Link,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';

type SummaryProps = {
  meta: BroadcastMeta;
};

export const Summary: React.FC<SummaryProps> = ({ meta }) => {
  return (
    <>
      <Typography variant="subtitle2" component="h2">
        Summary
      </Typography>
      <Box my={1}>
        <MUIAlert severity={AlertType.INFO}>
          This is a summary of the calls results used to send your voice
          notification. To learn more about call status and definitions visit{' '}
          <Link
            href="https://www.twilio.com/docs/voice/api/call-resource#call-status-values"
            target="_blank"
            rel="noopener"
          >
            Twilio Call Resource documentation
          </Link>
        </MUIAlert>
      </Box>
      <List dense>
        {Object.values(CallStatus).map((status) => {
          const { count = {} as Count } = meta;
          return (
            <ListItem key={status} dense style={{ padding: 0 }}>
              <ListItemText style={{ margin: 0 }}>
                <Typography variant="subtitle1" component="div">
                  {`${count[status]} - ${status}`}
                </Typography>
              </ListItemText>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};
