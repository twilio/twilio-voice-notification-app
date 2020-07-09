import { Injectable, UseGuards } from '@nestjs/common';
import { Broadcast } from './broadcast.model';
import { InjectModel } from '@nestjs/sequelize';
import { AuthGuard } from '../guards/auth.guard';
import { Call } from '../call/call.model';
import { BroadcastMeta } from '../types/broadcast-meta';
import { v4 as uuidv4 } from 'uuid';
import { TwilioService } from '../twilio/twilio.service';
import { CallInstance } from 'twilio/lib/rest/api/v2010/account/call';
import { Logger } from '@nestjs/common';

import {
  CallStatus,
  FinalStatus,
  ProgressionStatus,
} from '../types/call-status';

@Injectable()
@UseGuards(AuthGuard)
export class BroadcastService {
  constructor(
    @InjectModel(Broadcast)
    private broadcastModel: typeof Broadcast,
    @InjectModel(Call)
    private callModel: typeof Call,
    private readonly twilioService: TwilioService,
  ) {}

  async create(
    friendlyName: string,
    from: string,
    message: string,
  ): Promise<string> {
    const broadcastId = uuidv4();

    const broadcast = {
      broadcastId,
      friendlyName,
      from,
      message,
      recipients: [],
      dateCreated: new Date().toISOString(),
      canceled: false,
      channel: 'voice',
    };

    await this.broadcastModel.create(broadcast);

    return broadcastId;
  }

  async makeCalls(
    broadcastId: string,
    from: string,
    message: string,
    recipients: string[],
    statusCallback: string,
  ) {
    const makeCalls = recipients.map((to) => {
      return new Promise(async (resolve, reject) => {

        let callSid, status;

        try {
          Logger.log(`Creating a call resource for ${to}`);

          // Beware of https://www.twilio.com/docs/api/errors/20429 (Too Many Requests)
          // If you happen to stumble upon this error,
          // see https://support.twilio.com/hc/en-us/articles/360044308153-Twilio-API-response-Error-429-Too-Many-Requests-
          ({ callSid, status } = await this.twilioService.createCall(
            statusCallback,
            to,
            from,
            message,
          ));
        } catch (error) {
          Logger.error(`There was an error creating a call for: ${to}. Error ${error.message}`);
        }

        // if something fails during call creation, we still want to save the call instance
        // with a Failed status for visibility and tracking.
        if (!callSid) {
          callSid = uuidv4();
          status = CallStatus.FAILED;
        }

        const call = await this.callModel.create({
          callSid,
          status,
          to,
          broadcastId,
        });

        resolve(call);
      });
    });

    await Promise.all(makeCalls);
  }

  async getPage(
    page: number,
    pageSize: number,
  ): Promise<{ rows: Broadcast[]; count: number }> {
    const limit = pageSize;
    const offset = page * pageSize;

    return this.broadcastModel.findAndCountAll({
      limit,
      offset,
      order: [['dateCreated', 'DESC']],
    });
  }

  async update(callSid: string, status: string) {
    const instance = await this.callModel.findOne({ where: { callSid } });
    await instance.update({ status });
  }

  getById(id: string): Promise<Broadcast> {
    return this.broadcastModel.findOne({
      attributes: { exclude: ['recipients'] },
      where: {
        broadcastId: id,
      },
    });
  }

  getRecipientsPageByBroadcastId(
    id: string,
    page: number,
    pageSize: number,
  ): Promise<{ rows: Call[]; count: number }> {
    const limit = pageSize;
    const offset = page * pageSize;

    return this.callModel.findAndCountAll({
      limit,
      offset,
      where: {
        broadcastId: id,
      },
      order: [['updatedAt', 'DESC']],
    });
  }

  getAllRecipientsByBroadcastId(id: string): Promise<Call[]> {
    return this.callModel.findAll({
      where: {
        broadcastId: id,
      },
      order: [['updatedAt', 'DESC']],
    });
  }

  getAllInProgressRecipientsByBroadcastId(id: string): Promise<Call[]> {
    return this.callModel.findAll({
      where: {
        broadcastId: id,
        status: ProgressionStatus,
      },
    });
  }

  async cancelBroadcast(id: string): Promise<Broadcast> {
    // All calls that either Queued / Initiated / Ringing / In progress
    const inProgressCalls: Call[] = await this.getAllInProgressRecipientsByBroadcastId(
      id,
    );

    const cancelCalls: Promise<CallInstance>[] = inProgressCalls.map((call) => {
      const { callSid } = call;
      return this.twilioService.cancelCall(callSid);
    });

    await Promise.all(cancelCalls);

    const broadcast = await this.broadcastModel.findOne({
      where: { broadcastId: id },
    });

    this.callModel.update({ status: CallStatus.CANCELED }, { where: { status: ProgressionStatus }})

    return broadcast.update({ canceled: true });
  }

  async getMeta(id: string): Promise<BroadcastMeta> {
    const broadcast: Broadcast = await this.broadcastModel.findOne({
      where: { broadcastId: id },
    });

    // Total number of calls in the notification
    const total = await this.callModel.count({
      where: { broadcastId: id },
    });

    // Total number of completed calls in the notification
    const completed = await this.callModel.count({
      where: { broadcastId: id, status: FinalStatus },
    });

    // Total number of calls grouped by status, in the notification.
    const statusesCount = await Promise.all(
      Object.values(CallStatus).map(async (status) => {
        const count = await this.callModel.count({
          where: { broadcastId: id, status },
        });
        return { status, count };
      }),
    );

    const count = statusesCount.reduce(
      (prev, { status, count }) => ({ ...prev, [status]: count }),
      {},
    );

    const broadcastStatus = broadcast.canceled
      ? CallStatus.CANCELED
      : total === completed
      ? CallStatus.COMPLETED
      : CallStatus.IN_PROGRESS;

    return {
      total,
      completed,
      count,
      broadcastStatus,
    };
  }
}
