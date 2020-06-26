import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TestCall } from '../src/test-call/test-call.model';
import { Broadcast } from '../src/broadcast/broadcast.model';
import { Call } from '../src/call/call.model';
import { Sequelize } from 'sequelize';
import { SharedModule } from '../src/shared.module';
import { TwilioModule } from './twilio/twilio.module';

/**
 * This module is used only for e2e
 * It uses SQLite in memory database connector.
 */
@Module({
  imports: [
    TwilioModule,
    SharedModule.forRoot(false),
    SequelizeModule.forRootAsync({
      useFactory: () => {
        return {
          dialect: 'sqlite',
          storage: ':memory:',
          synchronize: true,
          models: [TestCall, Call, Broadcast],
        };
      },
    }),
  ],
})
export class E2eModule {
  constructor(sequelize: Sequelize) {
    sequelize.sync();
  }
}
