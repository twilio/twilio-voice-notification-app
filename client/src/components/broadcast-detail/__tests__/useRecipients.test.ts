import { renderHook, cleanup } from '@testing-library/react-hooks';
import { useRecipients } from '../hooks/useRecipients';
import { FetchMock } from 'jest-fetch-mock';
import { CallStatus } from '@/types';

jest.mock('react-router-dom', () => ({
  useParams: () => ({
    broadcastId: '0001',
  }),
}));

const fetch = global.fetch as FetchMock;

describe('broadcast detail > useRecipients', () => {
  afterEach(() => {
    cleanup();
    fetch.resetMocks();
  });

  test('polls for data until the notification is complete', async () => {
    fetch.mockResponses(
      JSON.stringify({
        meta: {
          broadcastStatus: CallStatus.IN_PROGRESS,
        },
        recipients: [
          {
            callSid: '00001',
            to: '+10000001',
            status: CallStatus.IN_PROGRESS,
          },
        ],
        pageCount: 1,
      }),
      JSON.stringify({
        meta: {
          broadcastStatus: CallStatus.COMPLETED,
        },
        recipients: [
          {
            callSid: '00001',
            to: '+10000001',
            status: CallStatus.COMPLETED,
          },
        ],
        pageCount: 1,
      })
    );

    const { waitForNextUpdate, result } = renderHook(() => useRecipients());
    await waitForNextUpdate();

    expect(fetch.mock.calls.length).toBe(2);
    expect(result.current).toMatchInlineSnapshot(`
      Object {
        "error": undefined,
        "loading": false,
        "meta": Object {
          "broadcastStatus": "completed",
        },
        "pageCount": 1,
        "recipients": Array [
          Object {
            "callSid": "00001",
            "status": "completed",
            "to": "+10000001",
          },
        ],
      }
    `);
  });
});
