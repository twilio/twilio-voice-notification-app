import { createBroadcast, createBroadcastInitialState } from '../reducers';
import {
  completeConfigureStep,
  completeRecipientsStep,
  completeReviewStep,
  DiscardBroadcast,
  discardBroadcast,
} from '@/redux';

const configureData = {
  completed: true,
  message: 'Test message',
  name: 'Test name',
  number: '+100001',
};

const recipientsData = {
  completed: true,
  selectedFile: new File([], 'test.txt'),
  numbers: ['+1000001', '+1000002'],
};

const reviewData = {
  completed: true,
  broadcastId: 'B00001',
};

describe('createBroadcast', () => {
  it('should handle COMPLETE_CONFIGURE_STEP', () => {
    const action = completeConfigureStep(configureData);

    expect(createBroadcast(undefined, action)).toEqual({
      steps: {
        ...createBroadcastInitialState.steps,
        configure: {
          ...configureData,
        },
      },
    });
  });

  it('should handle COMPLETE_RECIPIENTS_STEP', () => {
    const action = completeRecipientsStep(recipientsData);

    expect(createBroadcast(undefined, action)).toEqual({
      steps: {
        ...createBroadcastInitialState.steps,
        recipients: {
          ...recipientsData,
        },
      },
    });
  });

  it('should handle COMPLETE_REVIEW_STEP', () => {
    const action = completeReviewStep(reviewData);

    expect(createBroadcast(undefined, action)).toEqual({
      steps: {
        ...createBroadcastInitialState.steps,
        review: {
          ...reviewData,
        },
      },
    });
  });

  it('should handle DISCARD_BROADCAST', () => {
    const action: DiscardBroadcast = discardBroadcast();

    expect(createBroadcast(undefined, action)).toEqual({
      steps: {
        ...createBroadcastInitialState.steps,
      },
    });
  });
});
