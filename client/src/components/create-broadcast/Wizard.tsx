import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { BaseNavigation } from './BaseNavigation';
import { WizardStep } from './WizardStep';
import { steps as routerSteps } from './constants';
import { CustomConnector, StyledStepLabel, WizardStepIcon } from './styles';
import { StepItem } from './types';
import { ConfigureStep, RecipientsStep, ReviewStep } from '@/types';
import { Box, Stepper, Step, StepButton } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { stepsCompletionSelector } from '@/redux';

export type StepProps = {
  data: ConfigureStep | RecipientsStep | ReviewStep;
  activeStep: StepItem;
};

/**
 * Determines if a given step is ahead of the active step.
 * @param activeStep Active step
 * @param currentStep
 */
const isStepAhead = (activeStep: StepItem, currentStep?: StepItem): boolean => {
  if (!currentStep) return false;
  if (activeStep.key === currentStep.key) return false;
  if (!currentStep.next) return true;

  const nextStep = routerSteps.find(
    (step) => step.location === currentStep.next
  );

  return isStepAhead(activeStep, nextStep);
};

export const Wizard = ({ data, activeStep }: StepProps) => {
  // Info about completition status of each step.
  const stepsCompletion = useSelector(stepsCompletionSelector);

  return (
    <Box>
      <Stepper
        activeStep={activeStep && routerSteps.indexOf(activeStep)}
        alternativeLabel
        connector={<CustomConnector />}
        style={{ backgroundColor: 'transparent' }}
      >
        {routerSteps.map((step) => {
          const { label } = step;
          const completed =
            !isStepAhead(activeStep, step) && stepsCompletion[step.key];

          return (
            <Step key={label} disabled={true}>
              <StepButton
                icon={
                  <WizardStepIcon
                    icon={step.icon}
                    active={activeStep === step}
                    completed={completed}
                  />
                }
              >
                <StyledStepLabel>{label}</StyledStepLabel>
              </StepButton>
            </Step>
          );
        })}
      </Stepper>
      <Switch>
        {routerSteps.map((step) => (
          <Route
            key={step.key}
            path={step.location}
            render={() => React.createElement(step.component, { step, data })}
          />
        ))}
        <Redirect from="*" to="/create/configure" />
      </Switch>
    </Box>
  );
};

Wizard.Navigation = BaseNavigation;
Wizard.Step = WizardStep;
