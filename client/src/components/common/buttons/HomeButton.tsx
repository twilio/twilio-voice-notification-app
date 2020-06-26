import React from 'react';
import { Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const HomeButton = () => {
  return (
    <Button
      component={RouterLink}
      variant="outlined"
      color="primary"
      to="/broadcasts"
    >
      Back
    </Button>
  );
};

export default HomeButton;
