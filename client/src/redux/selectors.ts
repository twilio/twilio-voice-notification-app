import { StepType } from '@/types';
import { RootState as State } from './store';

const createBroadcastSelector = (state: State) => state.createBroadcast;

export const stepsSelector = (state: State) =>
  createBroadcastSelector(state).steps;

const isStepCompleted = (state: State, stepKey: StepType) =>
  stepsSelector(state)[stepKey].completed;
const isConfigureStepCompleted = (state: State) =>
  isStepCompleted(state, StepType.Configure);
const isRecipientsStepCompleted = (state: State) =>
  isStepCompleted(state, StepType.Recipients);
const isReviewStepCompleted = (state: State) =>
  isStepCompleted(state, StepType.Recipients);

const canViewRecipients = (state: State) => isConfigureStepCompleted(state);
const canViewReview = (state: State) =>
  canViewRecipients(state) && isRecipientsStepCompleted(state);

type StepsVisibility = { [k: string]: boolean };

export const stepsCompletionSelector = (state: State): StepsVisibility => ({
  configure: isConfigureStepCompleted(state),
  recipients: isRecipientsStepCompleted(state),
  review: isReviewStepCompleted(state),
});

export const stepsVisibilitySelector = (state: State): StepsVisibility => ({
  configure: true,
  recipients: canViewRecipients(state),
  review: canViewReview(state),
});
