import React, { useMemo } from 'react';
import { Alert } from '@material-ui/lab';
import { Grid, Typography, CircularProgress, Box } from '@material-ui/core';
import { useReview } from './hooks/useReview';
import { TextWrap } from '@/components/common/text-wrap';
import { NumbersTable } from '@/components/common/numbers-table';
import { StyledCard } from '@/components/common/styled-card';
import ReviewNavigation from './ReviewNavigation';
import useReviewStyles from './styles';

import {
  StepProps,
  Wizard,
  VALID_NUMBERS_TABLE,
} from '@/components/create-broadcast';

export const Review = ({ step }: StepProps) => {
  const classes = useReviewStyles();
  const {
    onComplete,
    loading,
    error,
    numbers,
    number,
    message,
    name,
  } = useReview();

  const formattedNumbers = useMemo(() => {
    return numbers?.map((formattedNumber, index) => ({
      line: index + 1,
      number: formattedNumber,
    }));
  }, [numbers]);

  return (
    <>
      <Wizard.Step step={step}>
        <Typography variant="h4" component="h2">
          3. Review
        </Typography>
        <Box mt={1}>
          <Typography>
            Your voice notification is almost done. Please review it and press
            “Send Notification” to start sending to the recipient list.
          </Typography>
        </Box>
        {(loading || error) && (
          <Box className={classes.progressContainer}>
            {loading && <CircularProgress />}
            {error && (
              <Alert severity="error">
                We could not create your broadcast this time, sorry.
              </Alert>
            )}
          </Box>
        )}
        <StyledCard className={classes.cardReview}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box component="dl">
                <Typography variant="subtitle2" component="h2">
                  Notification Name
                </Typography>
                <Box mb={2}>
                  <Typography variant="subtitle1">{name}</Typography>
                </Box>
                <Typography variant="subtitle2" component="h2">
                  From number
                </Typography>
                <Box mb={2}>
                  <Typography variant="subtitle1">{number}</Typography>
                </Box>
                <Typography variant="subtitle2" component="h2">
                  Notification Message
                </Typography>
                <Box mb={2}>
                  <Typography variant="body2">
                    <TextWrap text={message} />
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="subtitle2"
                component="h2"
                style={{ marginBottom: '15px' }}
              >
                Recipients
              </Typography>
              <NumbersTable
                headers={VALID_NUMBERS_TABLE.headers}
                rows={VALID_NUMBERS_TABLE.rows}
                data={formattedNumbers}
              />
            </Grid>
          </Grid>
        </StyledCard>
        <Alert severity="warning">
          The time it takes to complete sending all messages depends on the
          number of recipients and the Twilio account CPS rate (Calls Per
          Second). Please notice that by default accounts have a 1 CPS rate.
          Contact Sales or Support to increase your CPS rate.
        </Alert>
      </Wizard.Step>
      <ReviewNavigation
        onComplete={onComplete}
        canGoNext={!loading}
        currentStep={step}
      />
    </>
  );
};
