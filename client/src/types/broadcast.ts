import { Channel } from './channel';

export type Broadcast = {
  broadcastId: string;
  friendlyName: string;
  message: string;
  from: string;
  channel: Channel;
  dateCreated: Date;
  canceled: boolean;
  completed: boolean;
  endDate?: Date;
};
