import { Broadcast } from '../broadcast/broadcast.model';
import { CallStatus, FinalStatus } from '../types/call-status';

import {
  AfterUpdate,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class Call extends Model<Call> {
  @PrimaryKey
  @Column
  callSid!: string;

  @Column
  to!: string;

  @Column
  status!: CallStatus;

  @ForeignKey(() => Broadcast)
  @Column
  broadcastId: string;

  @AfterUpdate
  static async updateBroadcastIfNeeded(instance: Call) {

    // This behaves like a Trigger.
    // Everytime a Call is updateded, it determines whether or not
    // it was the last pending call and if so, it marks the Notification as completed.

    const { broadcastId } = instance;

    const total = await this.count({
      where: { broadcastId },
    });

    const completed = await this.count({
      where: { broadcastId, status: FinalStatus },
    });

    if (total === completed) {
      Broadcast
        .update(
          {
            completed: true,
            endDate: new Date(),
          },
          { where: { broadcastId }}
          );
    }
  }
}
