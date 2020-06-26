import {
  CompleteConfigureStep,
  CompleteRecipientsStep,
  CompleteReviewStep,
  DiscardBroadcast,
} from './types';

import {
  COMPLETE_CONFIGURE_STEP,
  COMPLETE_RECIPIENTS_STEP,
  COMPLETE_REVIEW_STEP,
  DISCARD_BROADCAST,
} from './constants';

import { ConfigureStep, RecipientsStep, ReviewStep } from '@/types';

export const completeConfigureStep = (
  data: ConfigureStep
): CompleteConfigureStep => {
  return {
    type: COMPLETE_CONFIGURE_STEP,
    payload: data,
  };
};

export const completeRecipientsStep = (
  data: RecipientsStep
): CompleteRecipientsStep => {
  return {
    type: COMPLETE_RECIPIENTS_STEP,
    payload: data,
  };
};

export const completeReviewStep = (data: ReviewStep): CompleteReviewStep => {
  return {
    type: COMPLETE_REVIEW_STEP,
    payload: data,
  };
};

export const discardBroadcast = (): DiscardBroadcast => ({
  type: DISCARD_BROADCAST,
});
