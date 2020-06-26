import React, { useCallback } from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';

type NextButtonProps = {
  nextUrl?: string;
  onComplete: () => void;
  disabled: boolean;
};

const NextButton: React.FC<NextButtonProps> = ({
  nextUrl = '',
  onComplete,
  disabled = false,
}) => {
  const history = useHistory();

  const completeStep = useCallback(
    (location: string) => {
      onComplete();
      location && history.push(location);
    },
    [onComplete, history]
  );

  return (
    <>
      {nextUrl && (
        <Button
          disabled={disabled}
          variant="contained"
          color="primary"
          onClick={() => completeStep(nextUrl)}
          data-testid="next-button"
        >
          Next
        </Button>
      )}
    </>
  );
};

export default NextButton;
