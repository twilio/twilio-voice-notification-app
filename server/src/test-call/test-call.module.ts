import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TestCall } from './test-call.model';
import { TestCallController } from './test-call.controller';
import { TestCallService } from './test-call.service';
import { TestCallGateway } from './test-call.gateway';

@Module({
  imports: [SequelizeModule.forFeature([TestCall])],
  exports: [SequelizeModule],
  providers: [TestCallGateway, TestCallService],
  controllers: [TestCallController],
})
export class TestCallModule {}
