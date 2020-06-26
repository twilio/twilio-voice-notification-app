import React from 'react';
import { waitFor, cleanup } from '@testing-library/react';
import { FetchMock } from 'jest-fetch-mock';
import moment from 'moment-timezone';

import { BroadcastList } from '@/components';
import { renderWithAppContexts } from '@/testUtils';
import { LOADER_TEST_ID } from '@/components/broadcast-list/constants';

const fetch = global.fetch as FetchMock;
moment.tz.setDefault('America/Los_Angeles');

describe('BroadcastList', () => {
  const emptyBroadcastListResponse = { broadcasts: [] };
  const sampleBroadcastListResponse = {
    broadcasts: [
      {
        broadcastId: '1',
        friendlyName: 'John Doe',
        dateCreated: moment('2020-05-04').toISOString(),
      },
      {
        broadcastId: '2',
        friendlyName: 'Jane Doe',
        dateCreated: moment('2020-01-01').toISOString(),
      },
      {
        broadcastId: '3',
        friendlyName: 'Foo Bar',
        dateCreated: moment('2019-11-11').toISOString(),
      },
    ],
    currentPage: 0,
    pageCount: 4,
  };

  afterEach(() => {
    cleanup();
    fetch.resetMocks();
  });

  test('loader is shown while loading', async () => {
    fetch.mockResponse(
      () =>
        new Promise((resolve, reject) =>
          setTimeout(() => reject({ body: 'ko' }), 100)
        )
    );
    const { getByTestId } = renderWithAppContexts(<BroadcastList />);
    expect(getByTestId(LOADER_TEST_ID)).toBeInTheDocument();
  });

  test('when request is successful broadcast list is rendered correctly', async () => {
    fetch.mockResponse(JSON.stringify(sampleBroadcastListResponse), {
      status: 200,
    });
    const { container } = renderWithAppContexts(<BroadcastList />);
    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });

  test('when request is unsuccessful an appropriate feedback message is shown', async () => {
    fetch.mockReject(new Error('Internal Server Error'));
    const { getByText } = renderWithAppContexts(<BroadcastList />);
    await waitFor(() => {
      expect(
        getByText(
          /Sorry, we could not retrieve your voice notifications history. Please try again/i
        )
      ).toBeInTheDocument();
    });
  });

  test('when there are no broadcasts an appropriate feedback message is shown', async () => {
    fetch.mockResponse(JSON.stringify(emptyBroadcastListResponse), {
      status: 200,
    });
    const { getByText } = renderWithAppContexts(<BroadcastList />);
    await waitFor(() => {
      expect(
        getByText(
          /You can create your first voice notification in 3 easy steps/i
        )
      ).toBeInTheDocument();
    });
  });
});
