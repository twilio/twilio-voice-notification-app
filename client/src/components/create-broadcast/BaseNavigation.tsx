import React from 'react';
import { Box, Grid } from '@material-ui/core';
import { StepItem } from './types';

import {
  BackButton,
  NextButton,
  DiscardBroadcastButton,
} from '@/components/common/buttons';

type BaseNavigationProps = {
  currentStep: StepItem;
  onComplete: () => void;
  canGoNext: boolean;
};

export const BaseNavigation: React.FC<BaseNavigationProps> = ({
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
          <NextButton
            nextUrl={currentStep.next}
            onComplete={onComplete}
            disabled={!canGoNext}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
