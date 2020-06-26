import { CallStatus } from './call-status';

export type Call = {
  callSid: string;
  to: string;
  status: CallStatus;
};
