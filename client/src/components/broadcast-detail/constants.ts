import { Broadcast, Channel } from '@/types';

export const defaultBroadcast: Broadcast = {
  channel: Channel.VOICE,
  friendlyName: '',
  from: '',
  broadcastId: '',
  message: '',
  dateCreated: new Date(),
  canceled: false,
  completed: false,
};

export const LOADER_TEST_ID = 'broadcast-detail-loader';
export const RECIPIENTS_TABLE_TEST_ID = 'recipients-table';
export const PAGINATOR_TEST_ID = 'paginator';
