import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Broadcast } from './broadcast.model';
import { BroadcastsController } from './broadcast.controller';
import { BroadcastService } from './broadcast.service';
import { Call } from '../call/call.model';

@Module({
  imports: [SequelizeModule.forFeature([Broadcast, Call])],
  providers: [BroadcastService],
  controllers: [BroadcastsController],
})
export class BroadcastModule {}
