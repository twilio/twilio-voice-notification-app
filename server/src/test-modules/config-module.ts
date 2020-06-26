import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ENV_VAR } from '../constants';
import { TEST_ACCOUNT_SID, TEST_AUTH_TOKEN, TEST_PASSCODE } from './fixtures';

export const configService = new ConfigService({
  [ENV_VAR.PASSCODE_KEY]: TEST_PASSCODE,
  [ENV_VAR.ACCOUNT_SID]: TEST_ACCOUNT_SID,
  [ENV_VAR.AUTH_TOKEN]: TEST_AUTH_TOKEN,
});

@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: configService,
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
