import { stepsCompletionSelector, stepsVisibilitySelector } from '../selectors';
import { createBroadcastInitialState } from '../reducers';
import { RootState } from '@/redux';

const state: RootState = {
  createBroadcast: {
    steps: {
      configure: {
        ...createBroadcastInitialState.steps.configure,
        completed: true,
      },
      recipients: {
        ...createBroadcastInitialState.steps.recipients,
        completed: false,
      },
      review: {
        ...createBroadcastInitialState.steps.review,
        completed: false,
      },
    },
  },
};

describe('selectors', () => {
  it('resolves steps completion correctly', () => {
    expect(stepsCompletionSelector(state)).toEqual({
      configure: true,
      recipients: false,
      review: false,
    });
  });

  it('resolves steps visibility correctly', () => {
    expect(stepsVisibilitySelector(state)).toEqual({
      configure: true,
      recipients: true,
      review: false,
    });
  });
});
