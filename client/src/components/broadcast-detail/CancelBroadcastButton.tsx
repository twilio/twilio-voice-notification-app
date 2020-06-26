import React, { useState, useCallback } from 'react';

import {
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';

type CancelBroadcastButtonProps = {
  onClick: () => void;
  isLoading: boolean;
};

export const CancelBroadcastButton: React.FC<CancelBroadcastButtonProps> = ({
  onClick,
  isLoading,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const closesDialog = () => setIsOpen(false);
  const openDialog = () => setIsOpen(true);
  const onAgree = useCallback(() => {
    onClick();
    closesDialog();
  }, [onClick]);
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={closesDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Cancel notification</DialogTitle>
        <DialogContent>
          The notification is in progress. If you cancel the notification,
          pending messages won’t be sent and corresponding calls will be
          cancelled. Are you sure?
        </DialogContent>
        <DialogActions>
          <Button onClick={closesDialog} color="primary">
            No
          </Button>
          <Button onClick={onAgree} color="primary" autoFocus>
            Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Button
        variant="outlined"
        color="secondary"
        onClick={openDialog}
        disabled={isLoading}
      >
        Cancel notification
        {isLoading && (
          <CircularProgress size={16} style={{ marginLeft: '8px' }} />
        )}
      </Button>
    </>
  );
};
