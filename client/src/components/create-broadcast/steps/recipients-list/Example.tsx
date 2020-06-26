import React, { memo } from 'react';
import { Typography, Box, List, ListItem } from '@material-ui/core';
import { useExampleStyles } from './styles';

const Example = memo(() => {
  const classes = useExampleStyles();

  return (
    <Box className={classes.root}>
      <Typography className={classes.title}>Example Recipient List</Typography>
      <Box mt={2}>
        <Typography>
          Text file should contain one phone number per line, and each phone
          number should be in international format.
        </Typography>
      </Box>
      <Box mt={2} className={classes.numbersBox}>
        <List dense>
          <ListItem dense>+15105436767</ListItem>
          <ListItem dense>+15107656399</ListItem>
          <ListItem dense>+61432286113</ListItem>
        </List>
      </Box>
    </Box>
  );
});

export default Example;
