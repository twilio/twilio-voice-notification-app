import { CallStatus } from './call-status';

export type Count = {
  queued: number;
  initiated: number;
  ringing: number;
  'in-progress': number;
  completed: number;
  busy: number;
  'no-answer': number;
  canceled: number;
  failed: number;
};

export type BroadcastMeta = {
  total?: number;
  completed?: number;
  count?: Count;
  broadcastStatus?: CallStatus;
};
