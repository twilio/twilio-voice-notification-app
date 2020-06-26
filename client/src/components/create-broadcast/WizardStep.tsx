import React from 'react';
import { Box } from '@material-ui/core';
import { StyledCard } from '@/components/common/styled-card';
import { StepItem } from './types';

type WizardStepProps = {
  step: StepItem;
};

export const WizardStep: React.FC<WizardStepProps> = ({ step, children }) => {
  return (
    <StyledCard>
      <Box p={3}>{children}</Box>
    </StyledCard>
  );
};
