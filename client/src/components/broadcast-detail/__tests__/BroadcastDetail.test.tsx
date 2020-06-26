import React from 'react';
import { cleanup, waitFor } from '@testing-library/react';
import { FetchMock } from 'jest-fetch-mock';
import MockDate from 'mockdate';
import moment from 'moment-timezone';

import { BroadcastDetail } from '../BroadcastDetail';
import { LOADER_TEST_ID, RECIPIENTS_TABLE_TEST_ID } from '../constants';
import { renderWithAppContexts } from '@/testUtils';
import { act } from 'react-dom/test-utils';

const fetch = global.fetch as FetchMock;
moment.tz.setDefault('America/Los_Angeles');

const sampleBroadcastResponse = {
  broadcast: {
    broadcastId: 'd4600746-2e8d-40cf-8a84-036cb20d9db7',
    friendlyName: 'Broadcast sample',
    message: 'Ahoy there!',
    from: '+12023187895',
    channel: 'voice',
    dateCreated: moment('2020-06-03 15:28:04').toISOString(),
    canceled: false,
  },
};

const sampleRecipientsResponse = {
  recipients: [
    {
      callSid: 'CA3f8433dc395551977d79d84bee54bf04',
      to: '+12015650934',
      status: 'completed',
      broadcastId: 'd4600746-2e8d-40cf-8a84-036cb20d9db7',
    },
    {
      callSid: 'CA73afe9a827db1bc18a14881b3b232ddb',
      to: '+12015723115',
      status: 'completed',
      broadcastId: 'd4600746-2e8d-40cf-8a84-036cb20d9db7',
    },
    {
      callSid: 'CA2eeb204c1fa1b898cb03fc7126d4ebff',
      to: '+12015711563',
      status: 'busy',
      broadcastId: 'd4600746-2e8d-40cf-8a84-036cb20d9db7',
    },
    {
      callSid: 'CAe5ebee100422399015e1c8a38ddc6413',
      to: '+12015552572',
      status: 'completed',
      broadcastId: 'd4600746-2e8d-40cf-8a84-036cb20d9db7',
    },
    {
      callSid: 'CA45bf025dd72af2a7ebeb3c7d37c8087a',
      to: '+12015581526',
      status: 'in-progress',
      broadcastId: 'd4600746-2e8d-40cf-8a84-036cb20d9db7',
    },
    {
      callSid: 'CAc04cb434c1434dbf8c3f0a479501ce1b',
      to: '+12015553700',
      status: 'in-progress',
      broadcastId: 'd4600746-2e8d-40cf-8a84-036cb20d9db7',
    },
    {
      callSid: 'CAc8900bfd65037303c904188d7edbaf3c',
      to: '+12015667027',
      status: 'ringing',
      broadcastId: 'd4600746-2e8d-40cf-8a84-036cb20d9db7',
    },
    {
      callSid: 'CAd30a3795ec713def1a819c2defc0fe38',
      to: '+12015623466',
      status: 'queued',
      broadcastId: 'd4600746-2e8d-40cf-8a84-036cb20d9db7',
    },
    {
      callSid: 'CA02be6e98a0cb2106fe1bcc76aa6f5db6',
      to: '+12015598376',
      status: 'queued',
      broadcastId: 'd4600746-2e8d-40cf-8a84-036cb20d9db7',
    },
    {
      callSid: 'CAdfe31eab845e8daa4220a16a20a1e4af',
      to: '+12015612792',
      status: 'queued',
      broadcastId: 'd4600746-2e8d-40cf-8a84-036cb20d9db7',
    },
  ],
  pageCount: 2,
  meta: {
    total: 20,
    completed: 4,
    count: {
      busy: 1,
      canceled: 0,
      completed: 2,
      failed: 1,
      'in-progress': 0,
      initiated: 0,
      'no-answer': 0,
      queued: 14,
      ringing: 2,
    },
    broadcastStatus: 'in-progress',
  },
};

describe('BroadcastDetail', () => {
  beforeAll(() => {
    MockDate.set(1592838350131); // Mon Jun 22 2020 17:05:50 GMT+0200 (Central European Summer Time)
  });

  afterEach(() => {
    cleanup();
    fetch.resetMocks();
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('loader is shown while loading', async () => {
    await act(async () => {
      jest.useFakeTimers();
      fetch.mockResponse(
        () =>
          new Promise((resolve) =>
            setTimeout(() => resolve({ body: 'ok' }), 200)
          )
      );
      const { getByTestId } = renderWithAppContexts(<BroadcastDetail />);
      expect(getByTestId(LOADER_TEST_ID)).toBeInTheDocument();
      jest.clearAllTimers();
    });
  });

  test('data is rendered correctly', async () => {
    fetch.mockResponses(
      [JSON.stringify(sampleBroadcastResponse), { status: 200 }],
      [JSON.stringify(sampleRecipientsResponse), { status: 200 }],
      [JSON.stringify(sampleRecipientsResponse), { status: 200 }]
    );

    const { container, getByTestId } = renderWithAppContexts(
      <BroadcastDetail />
    );

    await waitFor(() => {
      expect(getByTestId(RECIPIENTS_TABLE_TEST_ID)).toBeInTheDocument();
      expect(container).toMatchSnapshot();
    });
  });

  test('broadcast request error is handled correctly', async () => {
    fetch.mockReject(new Error('Internal Server Error'));

    const { container, getByText } = renderWithAppContexts(<BroadcastDetail />);
    await waitFor(() => {
      expect(
        getByText(
          'Sorry, something failed and we could not cancel the notification.'
        )
      ).toBeInTheDocument();

      expect(container).toMatchSnapshot();
    });
  });

  test('broadcast recipients request error is handled correctly', async () => {
    fetch.mockResponses(
      [JSON.stringify(sampleBroadcastResponse), { status: 200 }],
      [JSON.stringify(new Error('Internal Server Error')), { status: 500 }],
      [JSON.stringify(new Error('Internal Server Error')), { status: 500 }]
    );

    const { container, getByText } = renderWithAppContexts(<BroadcastDetail />);
    await waitFor(() => {
      expect(
        getByText(
          'Sorry, we could not retrieve your notification data this time.'
        )
      ).toBeInTheDocument();

      expect(container).toMatchSnapshot();
    });
  });
});
