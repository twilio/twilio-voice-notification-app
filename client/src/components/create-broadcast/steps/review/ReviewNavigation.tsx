import { Box, Grid } from '@material-ui/core';
import React from 'react';
import { StepItem } from '@/components/create-broadcast';

import {
  BackButton,
  InitiateButton,
  DiscardBroadcastButton,
} from '@/components/common/buttons';

type ReviewNavigationProps = {
  currentStep: StepItem;
  onComplete: () => void;
  canGoNext: boolean;
};

const ReviewNavigation: React.FC<ReviewNavigationProps> = ({
  currentStep,
  onComplete = () => {},
  canGoNext,
}) => {
  return (
    <Box mt={2}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <DiscardBroadcastButton />
        </Grid>
        <Grid item xs={4} style={{ textAlign: 'right' }}>
          <BackButton prevUrl={currentStep.prev} />
          <InitiateButton onComplete={onComplete} disabled={!canGoNext} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReviewNavigation;
