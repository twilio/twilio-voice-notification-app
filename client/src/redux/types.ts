import {
  COMPLETE_CONFIGURE_STEP,
  COMPLETE_RECIPIENTS_STEP,
  COMPLETE_REVIEW_STEP,
  DISCARD_BROADCAST,
} from './constants';

import { ConfigureStep, RecipientsStep, ReviewStep } from '@/types';

export type CompleteConfigureStep = {
  type: typeof COMPLETE_CONFIGURE_STEP;
  payload: ConfigureStep;
};

export type CompleteRecipientsStep = {
  type: typeof COMPLETE_RECIPIENTS_STEP;
  payload: RecipientsStep;
};

export type CompleteReviewStep = {
  type: typeof COMPLETE_REVIEW_STEP;
  payload: ReviewStep;
};

export type Steps = {
  [key: string]: ConfigureStep | RecipientsStep | ReviewStep;
};

export type CreateBroadcastState = {
  steps: Steps;
};

export type DiscardBroadcast = {
  type: typeof DISCARD_BROADCAST;
  payload?: any;
};

export type CreateBroadcastActionType =
  | CompleteConfigureStep
  | CompleteRecipientsStep
  | CompleteReviewStep
  | DiscardBroadcast;
