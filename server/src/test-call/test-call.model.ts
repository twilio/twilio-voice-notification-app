import { Broadcast } from '../broadcast/broadcast.model';

import {
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class TestCall extends Model {
  @PrimaryKey
  @Column
  callSid!: string;
  @Column
  to!: string;
  @Column
  from!: string;
  @Column(DataType.TEXT)
  message!: string;
  @Column
  status!: string;
  @ForeignKey(() => Broadcast)
  @Column
  broaqdcastId: string;
}
