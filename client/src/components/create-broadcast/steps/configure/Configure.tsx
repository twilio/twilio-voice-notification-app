import React, { ChangeEvent, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { isValidNumber } from 'libphonenumber-js/';
import isEmpty from 'lodash.isempty';
import { completeConfigureStep } from '@/redux';
import { ConfigureStep } from '@/types';
import { Alert, AlertType } from '@/components/common/alert';
import { buyNewNumberUrl } from './constants';
import { useNumbers, useTestCall, useConfigureState } from './hooks';

import {
  BaseNavigation,
  Wizard,
  StepProps,
} from '@/components/create-broadcast';

import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Grid,
  Divider,
  Box,
  CircularProgress,
  Typography,
} from '@material-ui/core';

import RefreshIcon from '@material-ui/icons/Refresh';
import useStyles, { WhiteTextField } from './styles';

export const Configure = ({ step, data }: StepProps) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { numbers, loadNumbers } = useNumbers();

  const {
    isValid,
    from = '',
    setFrom,
    message = '',
    setMessage,
    name = '',
    setName,
    testNumber = '',
    setTestNumber,
    alert,
    setAlert,
    resetAlert,
  } = useConfigureState(data as ConfigureStep);

  const {
    makeTestCall,
    cancelTestCall,
    isCancelLoading,
    isCancelAvailable,
    callStatus,
    isTestCallOngoing,
  } = useTestCall(from, testNumber, message);

  const onComplete = useCallback(() => {
    dispatch(
      completeConfigureStep({
        number: from,
        message,
        name,
        completed: true,
      })
    );
  }, [from, message, name, dispatch]);

  const handleNumberSelectChange = useCallback(
    ({ target: { value } }: ChangeEvent<any>) => {
      if (value === 'new') {
        window.open(buyNewNumberUrl, '_blank');
      } else {
        setFrom(value);
      }
    },
    [setFrom]
  );

  const testTheNumberHandler = useCallback(async () => {
    resetAlert();
    try {
      const finalStatus = await makeTestCall();
      setAlert({
        message: `Test call was ${finalStatus}`,
        type: AlertType.INFO,
      });
    } catch (error) {
      setAlert({
        message: 'It was not possible to complete the call.',
        type: AlertType.ERROR,
      });
    }
  }, [makeTestCall, setAlert, resetAlert]);

  const isTestCallButtonDisabled = useMemo(
    () =>
      !isValidNumber(testNumber) ||
      isTestCallOngoing ||
      isEmpty(message) ||
      isEmpty(testNumber) ||
      isEmpty(from),
    [from, isTestCallOngoing, message, testNumber]
  );

  return (
    <>
      <Wizard.Step step={step}>
        <Typography variant="h4" component="h2">
          1. Configure
        </Typography>
        <Box mt={1}>
          <Typography>
            Enter your voice notifications details and test your notification
          </Typography>
        </Box>
        <TextField
          id="name"
          inputProps={{
            'data-testid': 'broadcast-name',
          }}
          value={name}
          fullWidth
          label="Notification name"
          placeholder="Notification name is required"
          variant="outlined"
          margin="normal"
          onChange={(e) => setName(e.target.value.substr(0, 250))}
        />
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel id="from-label">From Number</InputLabel>
              <Select
                id="from"
                labelId="from-label"
                value={from}
                label="Choose your number"
                onChange={handleNumberSelectChange}
                inputProps={{
                  'data-testid': 'select-id',
                }}
              >
                {numbers &&
                  numbers.map(({ phoneNumber }) => (
                    <MenuItem key={phoneNumber} value={phoneNumber}>
                      {phoneNumber}
                    </MenuItem>
                  ))}
                <Divider />
                <MenuItem key="new" value="new">
                  Buy Twilio phone number
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              style={{ top: '3px' }}
              onClick={loadNumbers}
              startIcon={<RefreshIcon />}
            >
              Refresh number list
            </Button>
          </Grid>
        </Grid>
        <TextField
          id="message"
          fullWidth
          label="Broadcast Message"
          placeholder="Message"
          variant="outlined"
          margin="normal"
          multiline
          value={message}
          rows={4}
          onChange={(e) => setMessage(e.target.value.substr(0, 3000))}
          helperText="Message can’t exceed 3,000 characters"
        />
        <Grid container className={classes.testContainer}>
          <Grid item xs={12}>
            <Typography variant="h5" component="h2">
              Test your voice notification (optional)
            </Typography>
            <Typography>
              Enter your phone number to receive a call to test your voice
              notification before sending. Please note that this test could take
              up to a few minutes to complete.
            </Typography>
          </Grid>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={6}>
              <WhiteTextField
                id="test-number"
                fullWidth
                label="Phone number"
                placeholder="Enter broadcast to send"
                variant="outlined"
                margin="normal"
                helperText="Phone number should be in international format and start with +XX code"
                value={testNumber}
                onChange={(e) => setTestNumber(e.target.value)}
                disabled={isTestCallOngoing}
                data-testid="test-from-input-number"
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                color="primary"
                style={{ top: '-5px' }}
                disabled={isTestCallButtonDisabled}
                size="large"
                onClick={testTheNumberHandler}
                data-testid="test-button"
              >
                Send Test
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Alert alert={alert} />
              {isTestCallOngoing && (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                >
                  <Typography>Test call status: {callStatus}</Typography>
                  <CircularProgress style={{ margin: '5px 0' }} />
                  <Button
                    disabled={isCancelLoading || !isCancelAvailable}
                    onClick={cancelTestCall}
                  >
                    Cancel
                  </Button>
                </Box>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Wizard.Step>
      <BaseNavigation
        currentStep={step}
        onComplete={onComplete}
        canGoNext={isValid && !isTestCallOngoing}
      />
    </>
  );
};
