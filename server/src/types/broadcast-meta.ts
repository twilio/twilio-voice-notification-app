import { CallStatus } from './call-status';

export interface BroadcastMeta {
  total: number;
  completed: number;
  count: { [key: string]: number };
  broadcastStatus: CallStatus;
}
