import React from 'react';
import { act, cleanup, render } from '@testing-library/react';

import { DownloadReportButton } from '../DownloadReportButton';
import { CallStatus, Channel } from '@/types';
import { FetchMock } from 'jest-fetch-mock/types';

jest.mock('react-router-dom', () => ({
  useParams: () => ({
    broadcastId: '0001',
  }),
}));

let props = {
  broadcast: {
    broadcastId: '0001',
    friendlyName: 'Test name',
    message: 'Test message',
    from: '+1000001',
    channel: Channel.VOICE,
    dateCreated: new Date(),
    canceled: false,
    completed: true,
    endDate: undefined,
  },
  setHasFailed: jest.fn(),
};

const fetch = global.fetch as FetchMock;

describe('DownloadReportButton', () => {
  beforeEach(async () => {
    fetch.mockResponse(
      JSON.stringify({
        recipients: [
          {
            callSid: 'C000001',
            to: '+1000002',
            status: CallStatus.COMPLETED,
          },
          {
            callSid: 'C000002',
            to: '+1000003',
            status: CallStatus.FAILED,
          },
        ],
      })
    );
  });

  afterEach(() => {
    cleanup();
    fetch.resetMocks();
  });

  test('renders correctly', async () => {
    await act(async () => {
      const { asFragment } = await render(<DownloadReportButton {...props} />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
