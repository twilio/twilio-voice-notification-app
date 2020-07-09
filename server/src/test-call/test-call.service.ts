import { Injectable } from '@nestjs/common';
import { TestCall } from './test-call.model';
import { InjectModel } from '@nestjs/sequelize';
import { TestCallGateway } from './test-call.gateway';
import { TwilioService } from '../twilio/twilio.service';

@Injectable()
export class TestCallService {
  constructor(
    @InjectModel(TestCall)
    private model: typeof TestCall,
    private testCallGateway: TestCallGateway,
    private readonly twilioService: TwilioService,
  ) {}

  async create(
    to: string,
    from: string,
    message: string,
    statusCallback: string,
  ): Promise<{ callSid: string }> {
    const { callSid, status } = await this.twilioService.createCall(
      statusCallback,
      to,
      from,
      message,
    );

    await this.model.create({ callSid, to, from, message, status });
    return { callSid };
  }

  async update(callSid: string, callStatus: string): Promise<void> {
    await this.model.update({ status: callStatus }, { where: { callSid } });
    this.testCallGateway.server.emit('update', { status: callStatus });
  }

  async cancel(callSid: string) {
    await this.twilioService.cancelCall(callSid);
  }
}
