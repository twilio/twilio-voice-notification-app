import React from 'react';
import { AppBar, Typography, Box } from '@material-ui/core';
import useStyles from './styles';
import TwilioLogo from './TwilioLogo';

export const Header: React.FC = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.appBar}>
      <Box display="flex" alignItems="center">
        <Box ml={1} mr={1} display="flex">
          <TwilioLogo />
        </Box>
        <Typography variant="h6" component="h1">
          Voice Notifications Application
        </Typography>
        <Box ml={1} mt="6px" display="flex" alignItems="center">
          <Typography variant="subtitle2" component="span">
            <Box component="i" fontWeight="fontWeightLight">
              powered by Twilio
            </Box>
          </Typography>
        </Box>
      </Box>
    </AppBar>
  );
};
