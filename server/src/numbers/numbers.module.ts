import { Module } from '@nestjs/common';
import { NumbersController } from './numbers.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [NumbersController],
})
export class NumbersModule {}
