import {
  BROADCAST_GET_BY_ID_RESPONSE,
  BROADCAST_GET_META,
  BROADCAST_GET_PAGE_RESPONSE,
  BROADCAST_GET_RECIPIENTS_BY_PAGE,
  TEST_BROADCAST_ID,
} from './fixtures';

export const BroadcastService = {
  getPage: jest
    .fn()
    .mockReturnValue(Promise.resolve(BROADCAST_GET_PAGE_RESPONSE)),
  getById: jest
    .fn()
    .mockReturnValue(Promise.resolve(BROADCAST_GET_BY_ID_RESPONSE)),
  getRecipientsPageByBroadcastId: jest
    .fn()
    .mockReturnValue(Promise.resolve(BROADCAST_GET_RECIPIENTS_BY_PAGE)),
  getMeta: jest.fn().mockReturnValue(Promise.resolve(BROADCAST_GET_META)),
  update: jest.fn(),
  create: jest.fn().mockReturnValue(Promise.resolve(TEST_BROADCAST_ID)),
  makeCalls: jest.fn(),
};
