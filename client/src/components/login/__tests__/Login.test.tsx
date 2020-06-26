import React from 'react';
import { Route } from 'react-router-dom';
import { fireEvent, waitFor, cleanup } from '@testing-library/react';
import { FetchMock } from 'jest-fetch-mock';
import { renderWithAppContexts } from '@/testUtils';
import { Login } from '../Login';

import {
  FEEDBACK_ERROR_MSG,
  LOGIN_BUTTON_TEST_ID,
  PASSCODE_INPUT_TEST_ID,
  REDIRECT_URL,
  SESSION_STORAGE_PASSCODE_KEY,
} from '@/components/login/constants';

const fetch = global.fetch as FetchMock;

describe('Login', () => {
  const samplePasscode = '0123456789';

  const fillPasscode = (getByTestId: Function, passcode: string) => {
    fireEvent.change(getByTestId(PASSCODE_INPUT_TEST_ID), {
      target: { value: passcode },
    });
  };

  const fillAndSubmitLogin = (getByTestId: Function) => {
    fillPasscode(getByTestId, samplePasscode);
    fireEvent.click(getByTestId(LOGIN_BUTTON_TEST_ID), { button: 0 });
  };

  afterEach(() => {
    cleanup();
    fetch.resetMocks();
  });

  test('renders the page', () => {
    const { container } = renderWithAppContexts(<Login />);
    expect(container).toMatchSnapshot();
  });

  test('when login is successful user is redirected to broadcast list', async () => {
    fetch.mockResponse(JSON.stringify({}), { status: 204 });

    const dummyTestId = 'dummyTestId';
    const { getByTestId, history } = renderWithAppContexts(
      <>
        <Route path="/">
          <Login />
        </Route>
        <Route path={REDIRECT_URL}>
          <span data-testid={dummyTestId} />
        </Route>
      </>
    );

    fillAndSubmitLogin(getByTestId);

    await waitFor(() => {
      expect(getByTestId(dummyTestId)).toBeInTheDocument();
      expect(history.location.pathname).toEqual(REDIRECT_URL);
      expect(sessionStorage.getItem(SESSION_STORAGE_PASSCODE_KEY)).toEqual(
        samplePasscode
      );
    });
  });

  test('when login is unsuccessful a message error is shown and removed when passcode changes', async () => {
    fetch.mockResponse(JSON.stringify(new Error('Bad Request')), {
      status: 400,
    });
    const { getByText, getByTestId, queryByText } = renderWithAppContexts(
      <Login />
    );

    fillAndSubmitLogin(getByTestId);

    await waitFor(() => {
      expect(getByText(FEEDBACK_ERROR_MSG)).toBeInTheDocument();
      fillPasscode(getByTestId, '1234');
      expect(queryByText(FEEDBACK_ERROR_MSG)).not.toBeInTheDocument();
    });
  });

  test('login button is disabled when passcode is empty and enabled when it is filled', () => {
    const { getByTestId } = renderWithAppContexts(<Login />);
    const button = getByTestId(LOGIN_BUTTON_TEST_ID);
    expect(button).toBeDisabled();
    fillPasscode(getByTestId, samplePasscode);
    expect(button).not.toBeDisabled();
    fillPasscode(getByTestId, '');
    expect(button).toBeDisabled();
  });

  test('login button is disabled when login request is loading', async () => {
    fetch.mockResponse(
      () =>
        new Promise((resolve, reject) =>
          setTimeout(() => reject({ body: 'ko' }), 100)
        )
    );
    const { getByTestId } = renderWithAppContexts(<Login />);
    const button = getByTestId(LOGIN_BUTTON_TEST_ID);
    fillAndSubmitLogin(getByTestId);

    await waitFor(() => {
      expect(button).toBeDisabled();
    });
    await waitFor(() => {
      expect(button).not.toBeDisabled();
    });
  });
});
