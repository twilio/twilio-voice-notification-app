import { Call } from '../call/call.model';

import {
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  DataType,
} from 'sequelize-typescript';

@Table
export class Broadcast extends Model<Broadcast> {
  @PrimaryKey
  @Column
  public broadcastId!: string;
  @Column
  public friendlyName!: string;
  @Column(DataType.TEXT)
  public message!: string;
  @Column
  public from!: string;
  @Column
  public channel!: string;
  @Column(DataType.DATE)
  public dateCreated!: Date;
  @HasMany(() => Call)
  public recipients!: Call[];
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  public canceled!: boolean;
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  public completed: boolean;
  @Column(DataType.DATE)
  public endDate: Date;
}
