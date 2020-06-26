export enum ENV_VAR {
  PASSCODE_KEY = 'PASSCODE',
  DATABASE_KEY = 'database',
  ACCOUNT_SID = 'account_sid',
  AUTH_TOKEN = 'auth_token',
}

export const AUTH_HEADDER = 'x-twilio-notification-key';

export const CALL_STATUS_EVENTS = [
  'initiated',
  'ringing',
  'answered',
  'completed',
  'canceled',
];

export const CALL_CALLBACK_METHOD = 'POST';
