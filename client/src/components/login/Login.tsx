import React, { useState, useCallback, useMemo, useEffect } from 'react';
import useFetch from 'use-http';
import { useHistory, useLocation } from 'react-router';
import { Typography, Grid, Box, TextField, Button } from '@material-ui/core';
import TermsAndConditions from './TermsAndConditions';
import useStyles from './styles';

import {
  FEEDBACK_ERROR_MSG,
  LOGIN_BUTTON_TEST_ID,
  PASSCODE_INPUT_TEST_ID,
  REDIRECT_URL,
  SESSION_STORAGE_PASSCODE_KEY,
} from './constants';

export const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const [request, response] = useFetch();
  const [passcode, setPasscode] = useState('');
  const [hasFailed, setHasFailed] = useState(false);
  const location = useLocation<{ from: string }>();

  const clearError = useCallback(() => {
    if (hasFailed) setHasFailed(false);
  }, [hasFailed, setHasFailed]);

  const isDisabled = useMemo(() => !passcode.trim().length || request.loading, [
    passcode,
    request.loading,
  ]);

  const onChangePassCode = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      clearError();
      setPasscode(event.target.value);
    },
    [setPasscode, clearError]
  );

  const onSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      clearError();
      await request.post('/login', { passcode });
      if (response.ok) {
        sessionStorage.setItem(SESSION_STORAGE_PASSCODE_KEY, passcode);
        history.push(location?.state?.from || REDIRECT_URL);
      }
    },
    [clearError, request, passcode, response.ok, history, location]
  );

  useEffect(() => {
    setHasFailed(Boolean(request.error));
  }, [request.error]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const passcodeParam = params.get('passcode');

    if (passcodeParam) {
      setPasscode(passcodeParam);
    }
  }, [location, setPasscode]);

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom={true}>
        Send notifications to your customers over the phone
      </Typography>
      <Typography>
        In order to use the app you need to authenticate. Please login using the
        passcode generated during installation and app deployment
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <form
            onSubmit={onSubmit}
            className={classes.root}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="passcode"
              label="Enter your passcode"
              variant="outlined"
              size="small"
              onChange={onChangePassCode}
              value={passcode}
              error={hasFailed}
              type="password"
              helperText={hasFailed && FEEDBACK_ERROR_MSG}
              InputProps={{
                inputProps: {
                  'data-testid': PASSCODE_INPUT_TEST_ID,
                },
              }}
            />
            <Box mt={4}>
              <TermsAndConditions />
            </Box>
            <Box mt={4}>
              <Button
                variant="contained"
                color="primary"
                disabled={isDisabled}
                data-testid={LOGIN_BUTTON_TEST_ID}
                type="submit"
              >
                Login
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </>
  );
};
