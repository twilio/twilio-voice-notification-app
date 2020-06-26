import { CreateBroadcastState, CreateBroadcastActionType } from './types';
import { StepType, ConfigureStep, RecipientsStep, ReviewStep } from '@/types';

import {
  COMPLETE_CONFIGURE_STEP,
  COMPLETE_RECIPIENTS_STEP,
  COMPLETE_REVIEW_STEP,
  DISCARD_BROADCAST,
} from './constants';

export const createBroadcastInitialState: CreateBroadcastState = {
  steps: {
    configure: {
      completed: false,
      message: '',
      name: '',
      number: '',
    } as ConfigureStep,
    recipients: {
      completed: false,
      numbers: [],
      selectedFile: null,
    } as RecipientsStep,
    review: {
      broadcastId: '',
      completed: false,
    } as ReviewStep,
  },
};

const completeStep = (
  state: CreateBroadcastState,
  { payload }: CreateBroadcastActionType,
  stepKey: StepType
) => {
  const currentSteps = state.steps;
  return {
    ...state,
    steps: {
      ...currentSteps,
      [stepKey]: payload,
    },
  };
};

export const createBroadcast = (
  state = createBroadcastInitialState,
  action: CreateBroadcastActionType
) => {
  const { type } = action;

  switch (type) {
    case COMPLETE_CONFIGURE_STEP:
      return completeStep(state, action, StepType.Configure);
    case COMPLETE_RECIPIENTS_STEP:
      return completeStep(state, action, StepType.Recipients);
    case COMPLETE_REVIEW_STEP:
      return completeStep(state, action, StepType.Review);
    case DISCARD_BROADCAST:
      return { ...createBroadcastInitialState };
    default:
      return state;
  }
};
