import { TEST_CALL_SERVICE_RESPONSE } from './fixtures';

export const TestCallService = {
  create: jest
    .fn()
    .mockReturnValue(Promise.resolve(TEST_CALL_SERVICE_RESPONSE)),
  update: jest.fn().mockReturnValue(Promise.resolve()),
};
