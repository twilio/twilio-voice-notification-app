import React, { useCallback } from 'react';
import { Box, Button } from '@material-ui/core';
import MUIAlert from '@material-ui/lab/Alert';

import { AlertDto } from './types';

type AlertProps = {
  alert: AlertDto;
  showReload?: boolean;
};

export const Alert: React.FC<AlertProps> = ({ alert, showReload = false }) => {
  const reload = useCallback(() => {
    window.location.reload();
  }, []);

  if (!alert?.message) {
    return null;
  }

  const action = showReload ? (
    <Box m={1}>
      <Button onClick={reload} variant="outlined" color="primary">
        Reload
      </Button>
    </Box>
  ) : null;

  return (
    <MUIAlert
      severity={alert.type}
      action={action}
      style={{ alignItems: 'center' }}
    >
      {alert.message}
    </MUIAlert>
  );
};
