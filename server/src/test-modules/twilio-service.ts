import { PHONE_NUMBERS, TEST_CALL_CREATE_CALL_RESPONSE } from './fixtures';

export const TwilioService = {
  getPhoneNumbers: () => Promise.resolve(PHONE_NUMBERS),
  createCall: jest
    .fn()
    .mockReturnValue(Promise.resolve(TEST_CALL_CREATE_CALL_RESPONSE)),
};
