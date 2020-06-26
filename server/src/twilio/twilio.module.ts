import { Module, Global } from '@nestjs/common';
import { TwilioService } from './twilio.service';

@Global()
@Module({
  providers: [TwilioService],
  exports: [TwilioService],
})
export class TwilioModule {}
