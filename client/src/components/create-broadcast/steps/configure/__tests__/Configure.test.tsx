import React from 'react';
import { FetchMock } from 'jest-fetch-mock/types';
import { renderWithAppContexts } from '@/testUtils';
import { StepProps } from '@/components/create-broadcast/types';
import { steps } from '../../../constants';
import { Configure } from '../Configure';
import { useTestCall } from '../hooks/useTestCall';
import { CallStatus } from '@/types';
import UserEvent from '@testing-library/user-event';

import {
  waitFor,
  cleanup,
  fireEvent,
  RenderResult,
  within,
} from '@testing-library/react';

jest.mock('../hooks/useTestCall');

export const selectMaterialUiSelectOption = (
  element: any,
  optionText: string
) => {
  // The the button that opens the dropdown, which is a sibling of the input
  const selectButton = element.parentNode.querySelector('[role=button]');

  // Open the select dropdown
  UserEvent.click(selectButton);

  // Get the dropdown element. We don't use getByRole() because it includes <select>s too.
  const listbox = document.body.querySelector<HTMLUListElement>(
    'ul[role=listbox]'
  );

  // Click the list item
  const listItem = within(listbox!).getByText(optionText);
  UserEvent.click(listItem);
};

const fetch = global.fetch as FetchMock;
const testNumber = '+34555666777';
const useTestCallMock = useTestCall as jest.MockedFunction<typeof useTestCall>;

describe('Configure', () => {
  let wrapper: RenderResult;
  const step = steps[0];
  const props: StepProps = {
    data: {
      completed: false,
      name: '',
      number: '',
      message: 'Ahoy test!',
    },
    step,
  };

  beforeEach(async () => {
    fetch.mockResponse(JSON.stringify([{ phoneNumber: testNumber }]));
  });

  afterEach(() => {
    cleanup();
    fetch.resetMocks();
  });

  test('renders the page', async () => {
    useTestCallMock.mockReturnValue({
      makeTestCall: jest.fn(),
      callStatus: CallStatus.INITIATED,
      isTestCallOngoing: false,
      cancelTestCall: jest.fn(),
      isCancelAvailable: false,
      isCancelLoading: false,
    });

    wrapper = renderWithAppContexts(<Configure {...props} />);
    expect(wrapper.container).toMatchSnapshot();

    await waitFor(() => {
      expect(fetch.mock.calls.length).toBe(1);
    });
  });

  test('should have disabled the test btn when data is missing', async () => {
    wrapper = renderWithAppContexts(<Configure {...props} />);

    await waitFor(() => {
      expect(fetch.mock.calls.length).toBe(1);
    });

    const { getByTestId } = wrapper;
    expect(getByTestId('test-button')).toBeDisabled();

    const selectNode = getByTestId('select-id') as HTMLInputElement;
    selectMaterialUiSelectOption(selectNode, testNumber);

    const fromInput = getByTestId('test-from-input-number').querySelector(
      'input'
    )!;

    fireEvent.change(fromInput, { target: { value: '+34626222111' } });
    expect(getByTestId('test-button')).not.toBeDisabled();
  });

  test('click test should make a call', async () => {
    const makeTestCall = jest.fn();

    useTestCallMock.mockImplementation(() => ({
      makeTestCall,
      callStatus: 'initiating',
      isTestCallOngoing: false,
      cancelTestCall: jest.fn(),
      isCancelAvailable: false,
      isCancelLoading: false,
    }));

    wrapper = renderWithAppContexts(<Configure {...props} />);

    await waitFor(() => {
      expect(fetch.mock.calls.length).toBe(1);
    });

    const { getByTestId } = wrapper;
    selectMaterialUiSelectOption(getByTestId('select-id'), testNumber);

    fireEvent.change(
      getByTestId('test-from-input-number').querySelector('input')!,
      { target: { value: '+34626222111' } }
    );

    fireEvent.click(getByTestId('test-button'));

    await waitFor(() => {
      expect(makeTestCall).toHaveBeenCalled();
    });
  });

  test('when reciving a new status, should be updated in the UI', async () => {
    const makeTestCall = jest.fn();

    useTestCallMock.mockImplementation(() => ({
      makeTestCall,
      callStatus: CallStatus.IN_PROGRESS,
      isTestCallOngoing: true,
      cancelTestCall: jest.fn(),
      isCancelAvailable: false,
      isCancelLoading: false,
    }));

    wrapper = renderWithAppContexts(<Configure {...props} />);
    const { getByText } = wrapper;

    expect(getByText(/in-progress/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(fetch.mock.calls.length).toBe(1);
    });
  });

  test('when a test-call is ongoing the cancel button should be enabled', async () => {
    useTestCallMock.mockImplementation(() => ({
      makeTestCall: jest.fn(),
      callStatus: CallStatus.IN_PROGRESS,
      isTestCallOngoing: true,
      cancelTestCall: jest.fn(),
      isCancelAvailable: true,
      isCancelLoading: false,
    }));

    wrapper = renderWithAppContexts(<Configure {...props} />);
    const { getByText } = wrapper;

    await waitFor(() => {
      expect(getByText(/cancel/i)).toBeInTheDocument();
      expect(getByText(/cancel/i)).not.toBeDisabled();
    });
  });

  test('when cancel test is loading the test button should be disabled', async () => {
    useTestCallMock.mockImplementation(() => ({
      makeTestCall: jest.fn(),
      callStatus: CallStatus.IN_PROGRESS,
      isTestCallOngoing: true,
      cancelTestCall: jest.fn(),
      isCancelAvailable: true,
      isCancelLoading: true,
    }));

    wrapper = renderWithAppContexts(<Configure {...props} />);

    const { getByText } = wrapper;

    await waitFor(() => {
      expect(getByText(/cancel/i)).toBeInTheDocument();
      expect(getByText(/cancel/i)).toBeDisabled();
    });
  });

  test('when the call is not yet processed the cancel button should be disabled', async () => {
    useTestCallMock.mockImplementation(() => ({
      makeTestCall: jest.fn(),
      callStatus: CallStatus.IN_PROGRESS,
      isTestCallOngoing: true,
      cancelTestCall: jest.fn(),
      isCancelAvailable: false,
      isCancelLoading: false,
    }));

    wrapper = renderWithAppContexts(<Configure {...props} />);
    const { getByText } = wrapper;

    await waitFor(() => {
      expect(getByText(/cancel/i)).toBeInTheDocument();
      expect(getByText(/cancel/i)).toBeDisabled();
    });
  });
});
