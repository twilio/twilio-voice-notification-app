import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useRecipientsList } from './hooks';
import { completeRecipientsStep } from '@/redux';
import { RecipientsStep } from '@/types';
import { Box, Typography, Link } from '@material-ui/core';
import { StyledAlert, StyledBox } from './styles';
import { Alert } from '@/components/common/alert';
import { NumbersTable } from '@/components/common/numbers-table';

import useStyles from './styles';
import Uploader from './Uploader';
import Example from './Example';

import {
  Wizard,
  BaseNavigation,
  StepProps,
  VALID_NUMBERS_TABLE,
  INVALID_NUMBERS_TABLE,
} from '@/components/create-broadcast';

export const RecipientList = ({ step, data }: StepProps) => {
  const dispatch = useDispatch();

  const classes = useStyles();

  const {
    numbers: savedNumbers,
    selectedFile: savedSelectedFile,
    completed,
  } = data as RecipientsStep;

  const {
    selectedFile,
    getRootProps,
    getInputProps,
    invalidNumbers,
    validNumbers,
    alert,
  } = useRecipientsList({
    savedNumbers,
    savedSelectedFile,
  });

  const isValid = useMemo(() => {
    return (
      !!selectedFile && invalidNumbers.length < 1 && validNumbers.length > 0
    );
  }, [selectedFile, invalidNumbers, validNumbers]);

  const showResultView = useMemo(() => {
    return completed || selectedFile;
  }, [completed, selectedFile]);

  const onComplete = () => {
    dispatch(
      completeRecipientsStep({
        numbers: validNumbers.map(({ number }: { number: string }) => number),
        selectedFile,
        completed: true,
      })
    );
  };

  return (
    <>
      <Wizard.Step step={step}>
        <Typography variant="h4" component="h2">
          2. Recipients list
        </Typography>
        <Box mt={1}>
          <Typography>
            Please provide the list of recipients to send your voice
            notification.
          </Typography>
        </Box>
        <StyledAlert severity="info">
          Voice notifications are limited to 500 recipients. Please note that
          the destinations you need to call should be enabled. You can manage
          call destinations from Twilio Console in{' '}
          <Link href="https://www.twilio.com/console/voice/calls/geo-permissions">
            Voice Geographic Permission
          </Link>
        </StyledAlert>

        <Box display="flex" flexDirection="row" mt={2}>
          {showResultView && (
            <StyledBox flexGrow={1}>
              <Alert alert={alert} />
              <Box mt={2}>
                {isValid ? (
                  <NumbersTable
                    headers={VALID_NUMBERS_TABLE.headers}
                    rows={VALID_NUMBERS_TABLE.rows}
                    data={validNumbers}
                  />
                ) : (
                  <NumbersTable
                    headers={INVALID_NUMBERS_TABLE.headers}
                    rows={INVALID_NUMBERS_TABLE.rows}
                    data={invalidNumbers}
                  />
                )}
              </Box>
            </StyledBox>
          )}
          <StyledBox
            className={
              !showResultView ? classes.maxUploadView : classes.shrunkUloadVoew
            }
          >
            <Box p={3}>
              <Box display="flex" flexDirection="column" minWidth="400px">
                <Uploader
                  getRootProps={getRootProps}
                  getInputProps={getInputProps}
                  selectedFile={selectedFile}
                />
                <Example />
              </Box>
            </Box>
          </StyledBox>
        </Box>
      </Wizard.Step>
      <BaseNavigation
        currentStep={step}
        onComplete={onComplete}
        canGoNext={isValid}
      />
    </>
  );
};
