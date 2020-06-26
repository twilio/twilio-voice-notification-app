import React, { useCallback } from 'react';
import { Button } from '@material-ui/core';

type InitiateButtonProps = {
  onComplete: () => void;
  disabled: boolean;
};

const InitiateButton: React.FC<InitiateButtonProps> = ({
  onComplete,
  disabled = false,
}) => {
  const completeStep = useCallback(() => {
    onComplete();
  }, [onComplete]);

  return (
    <Button
      disabled={disabled}
      variant="contained"
      color="primary"
      onClick={completeStep}
      data-testid="send-notification"
    >
      Send Notification
    </Button>
  );
};

export default InitiateButton;
