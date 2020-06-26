import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { TestCall } from './test-call/test-call.model';
import { Broadcast } from './broadcast/broadcast.model';
import { Call } from './call/call.model';
import { Sequelize } from 'sequelize';
import { SharedModule } from './shared.module';
import { TwilioModule } from './twilio/twilio.module';
import { ENV_VAR } from './constants';

// Only serve static assets when the app is running in production
// For local development, Webpack dev server already takes care of it.
const shouldServeStaticContent = process.env.NODE_ENV === 'production';

/**
 * Main module used in Development and Production.
 * It uses PostgreSQL database connector.
 */
@Module({
  imports: [
    TwilioModule,
    SharedModule.forRoot(shouldServeStaticContent),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const database = configService.get<any>(ENV_VAR.DATABASE_KEY);
        return {
          dialect: 'postgres',
          ...database,
          synchronize: true,
          models: [TestCall, Call, Broadcast],
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {
  constructor(sequelize: Sequelize) {
    // It will create the database the first time.
    // For a list of options, see: https://sequelize.org/master/class/lib/sequelize.js~Sequelize.html#instance-method-sync
    sequelize.sync();
  }
}
