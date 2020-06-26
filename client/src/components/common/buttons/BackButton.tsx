/* eslint-disable no-restricted-globals */

import React, { useCallback } from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';

type BackButtonProps = {
  prevUrl?: string;
};

const BackButton: React.FC<BackButtonProps> = ({ prevUrl = '' }) => {
  const history = useHistory();

  const goBack = useCallback(
    (location: string) => {
      location && history.push(location);
    },
    [history]
  );

  return (
    <>
      {prevUrl && (
        <Button
          variant="outlined"
          color="primary"
          style={{ marginRight: '15px' }}
          onClick={() => goBack(prevUrl)}
        >
          Back
        </Button>
      )}
    </>
  );
};

export default BackButton;
