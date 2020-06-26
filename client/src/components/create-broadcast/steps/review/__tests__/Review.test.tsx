import React from 'react';
import { renderWithAppContexts } from '@/testUtils';
import { Review } from '../Review';
import { steps } from '@/components/create-broadcast/constants';
import { useReview } from '../hooks/useReview';

jest.mock('../hooks/useReview');
const useReviewMock = useReview as jest.MockedFunction<typeof useReview>;

describe('Review', () => {
  afterAll(jest.clearAllMocks);
  test('render the page', () => {
    useReviewMock.mockReturnValue({
      onComplete: jest.fn(),
      loading: false,
      numbers: ['+34555666777'],
      number: '+34666222333',
      message: 'Test message',
      name: 'Test name',
    });
    const props = {
      data: {
        completed: true,
        broadcastId: '',
      },
      step: steps[2],
    };
    const wrapper = renderWithAppContexts(<Review {...props} />);
    expect(wrapper.container).toMatchSnapshot();
  });
  test('if post fails it should show an error message', () => {
    useReviewMock.mockReturnValue({
      onComplete: jest.fn(),
      loading: false,
      error: new Error('Something went wrong'),
      numbers: ['+34555666777'],
      number: '+34666222333',
      message: 'Test message',
      name: 'Test name',
    });
    const props = {
      data: {
        completed: true,
        broadcastId: '',
      },
      step: steps[2],
    };
    const { getByText } = renderWithAppContexts(<Review {...props} />);
    expect(
      getByText(/We could not create your broadcast this time, sorry./i)
    ).toBeInTheDocument();
  });
});
