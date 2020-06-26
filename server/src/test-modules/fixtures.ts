import { CallStatus } from '../types/call-status';

export const TEST_PASSCODE = '12345';
export const TEST_AUTH_TOKEN = '00000000000000000';
export const TEST_ACCOUNT_SID = 'AC00000000000000';

export const TEST_BROADCAST_ID = 'B000001';

export const PHONE_NUMBERS = [
  {
    phoneNumber: '+1000001',
  },
  {
    phoneNumber: '+1000002',
  },
];

export const TEST_CALL_SERVICE_RESPONSE = { broadcastId: 'B00000' };

export const TEST_CALL_CREATE_CALL_RESPONSE = {
  status: 'in-progress',
  callSid: 'C00000',
};

export const BROADCAST_GET_PAGE_RESPONSE = {
  rows: [
    { broadcastId: 'B00001' },
    { broadcastId: 'B00002' },
    { broadcastId: 'B00003' },
    { broadcastId: 'B00004' },
    { broadcastId: 'B00005' },
  ],
  count: 5,
};

export const BROADCAST_GET_BY_ID_RESPONSE = {
  broadcastId: 'B00001',
};

export const BROADCAST_GET_RECIPIENTS_BY_PAGE = {
  rows: [
    { callSid: 'C00001' },
    { callSid: 'C00002' },
    { callSid: 'C00003' },
    { callSid: 'C00004' },
  ],
  count: 4,
};

export const BROADCAST_GET_META = {
  total: 4,
  completed: 3,
  successful: 1,
  broadcastStatus: CallStatus.COMPLETED,
};
