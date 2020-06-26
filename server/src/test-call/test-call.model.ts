import { Broadcast } from '../broadcast/broadcast.model';

import {
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class TestCall extends Model<TestCall> {
  @PrimaryKey
  @Column
  callSid!: string;
  @Column
  to!: string;
  @Column
  from!: string;
  @Column
  message!: string;
  @Column
  status!: string;
  @ForeignKey(() => Broadcast)
  @Column
  broaqdcastId: string;
}
