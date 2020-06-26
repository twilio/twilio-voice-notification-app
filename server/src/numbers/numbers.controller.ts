import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { IncomingPhoneNumberInstance } from 'twilio/lib/rest/api/v2010/account/incomingPhoneNumber';
import { TwilioService } from '../twilio/twilio.service';

@Controller('numbers')
@UseGuards(AuthGuard)
export class NumbersController {
  constructor(private readonly service: TwilioService) {}

  /**
   * GET /numbers
   * Retrieves the list of IncomingPhoneNumbers for the current account.
   * @see https://www.twilio.com/docs/phone-numbers/api/incomingphonenumber-resource
   */
  @Get()
  async getNumbers(): Promise<IncomingPhoneNumberInstance[]> {
    return await this.service.getPhoneNumbers();
  }
}
