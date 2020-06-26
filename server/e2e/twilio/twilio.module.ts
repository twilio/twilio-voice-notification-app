import { v4 } from 'uuid'
import { Module, Global } from '@nestjs/common';
import { TwilioService } from '../../src/twilio/twilio.service';

/**
 * Fake Twilio Service to mimic Twilio Client requests and responses.
 */
const mockedTwilioService = {
  async createCall() {
    return Promise.resolve({
      callSid: v4(),
      status: 'initated'
    });
  },
  async getPhoneNumbers() {
    return Promise.resolve([{
      capabilities: {
        voice: true,
        sms: true
      },
      phoneNumber: '+35625211106'
    },
    {
      capabilities: {
        voice: true,
        sms: true
      },
      phoneNumber: '+35625211107'
    }]);
  },
};

@Global()
@Module({
  providers: [
    {
      provide: TwilioService,
      useValue: mockedTwilioService,
    },
  ],
  exports: [TwilioService],
})
export class TwilioModule {}
