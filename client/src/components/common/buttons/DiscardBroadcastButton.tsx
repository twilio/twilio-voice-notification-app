import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { discardBroadcast } from '@/redux';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from '@material-ui/core';

const DiscardBroadcastButton = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleRedirect = useCallback(() => {
    dispatch(discardBroadcast());
    history.push('/broadcasts');
  }, [dispatch, history]);

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={closeModal}
        aria-labelledby="discard-broadcast-modal"
        aria-describedby="discard-broadcast-confirmation"
      >
        <DialogTitle> Discard notification</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If you discard the notification without completing, changes will not
            be saved. Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="primary">
            No
          </Button>
          <Button onClick={handleRedirect} color="primary" autoFocus>
            Yes, discard
          </Button>
        </DialogActions>
      </Dialog>
      <Button variant="outlined" color="secondary" onClick={openModal}>
        Discard
      </Button>
    </>
  );
};

export default DiscardBroadcastButton;
