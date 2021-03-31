import * as url from 'url';
import { TestCallService } from './test-call.service';
import { AuthGuard } from '../guards/auth.guard';

import {
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
  Get,
  Param,
} from '@nestjs/common';

@Controller('test-call')
export class TestCallController {
  constructor(private readonly testCallService: TestCallService) {}

  /**
   * POST /test-call
   * Triggers a new call for testing purposes.
   * @param from Caller number
   * @param to Callee number
   * @param message Message to deliver
   */
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post()
  async makeTestCall(
    @Body('from') from: string,
    @Body('to') to: string,
    @Body('message') message: string,
    @Headers('referer') fullUrl: string,
  ): Promise<any> {
    try {
      const baseUrl = new URL(fullUrl);

      const statusCallback = url.format({
        protocol: baseUrl.protocol,
        hostname: baseUrl.hostname,
        pathname: '/api/test-call/callback',
      });

      return await this.testCallService.create(
        to,
        from,
        message,
        statusCallback,
      );
    } catch (error) {
      throw new HttpException(
        `Error: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * POST /test-call/callback
   * webhook used by Twilio to communicate every Call status change
   * @param callSid
   * @param callStatus
   */
  @HttpCode(HttpStatus.OK)
  @Post('callback')
  async callback(
    @Body('CallSid') callSid: string,
    @Body('CallStatus') callStatus: string,
  ): Promise<void> {
    await this.testCallService.update(callSid, callStatus);
  }

  /**
   * GET /test-call/cancel/:callSid
   * Cancels the test call
   * @param callSid
   */
  @HttpCode(HttpStatus.OK)
  @Get('/cancel/:callSid')
  async cancel(@Param('callSid') callSid) {
    await this.testCallService.cancel(callSid);
  }
}
