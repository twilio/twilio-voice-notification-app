import { useHistory, useLocation } from 'react-router';
import { useEffect, useState, useCallback } from 'react';
import { StepItem } from '../types';
import { useSelector } from 'react-redux';
import { steps as routerSteps } from '../constants';

import {
  stepsVisibilitySelector,
  stepsSelector,
} from '@/redux';

export const useCreateBroadcastState = () => {
  const defaultStep = routerSteps[0];
  const { pathname } = useLocation();
  const [activeStep, setActiveStep] = useState<StepItem>(defaultStep);
  const storeSteps = useSelector(stepsSelector);
  const stepsVisibility = useSelector(stepsVisibilitySelector);
  const history = useHistory();

  const findFirstIncompleteStep = useCallback(
    (step: StepItem = defaultStep): StepItem => {
      if (stepsVisibility[step.key]) {
        return step;
      } else {
        const prevStep = routerSteps.find(
          (routerStep) => routerStep.location === step.prev
        );
        return findFirstIncompleteStep(prevStep);
      }
    },
    [stepsVisibility, defaultStep]
  );

  const redirectIfStepIsNotAvailable = useCallback(
    (currentStep: StepItem) => {
      if (!stepsVisibility[currentStep.key]) {
        const stepToNavigate = findFirstIncompleteStep(currentStep);
        history.push(stepToNavigate.location);
      }
    },
    [findFirstIncompleteStep, stepsVisibility, history]
  );

  useEffect(() => {
    const currentStep =
      routerSteps.find((step) => step.location === pathname) || defaultStep;

    redirectIfStepIsNotAvailable(currentStep);

    currentStep && setActiveStep(currentStep);
  }, [pathname, storeSteps, redirectIfStepIsNotAvailable, defaultStep]);

  return { activeStep, data: storeSteps[activeStep.key] };
};
