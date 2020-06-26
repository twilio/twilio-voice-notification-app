import { BroadcastService } from './broadcast.service';
import { Broadcast } from './broadcast.model';
import { AuthGuard } from '../guards/auth.guard';
import * as url from 'url';
import { ConfigService } from '@nestjs/config';
import { Call } from '../call/call.model';
import { BroadcastMeta } from '../types/broadcast-meta';
import { Response } from 'express';
import { ENV_VAR } from '../constants';

import {
  Controller,
  Res,
  Get,
  Post,
  Patch,
  Body,
  UseGuards,
  Param,
  Query,
  Headers,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';

@Controller('broadcasts')
export class BroadcastsController {
  private readonly passCode;

  constructor(
    private readonly broadcastService: BroadcastService,
    private configService: ConfigService,
  ) {
    this.passCode = this.configService.get<string>(ENV_VAR.PASSCODE_KEY);
  }

  /**
   * GET /broadcasts/
   * Return a paginated list of Notifications
   * @param page The page number
   * @param pageSize The number of notifications per page
   */
  @UseGuards(AuthGuard)
  @Get()
  async getBroadcasts(
    @Query('page') page = 0,
    @Query('pageSize') pageSize = 10,
  ): Promise<{
    broadcasts: Broadcast[];
    pageCount: number;
  }> {
    const { rows, count } = await this.broadcastService.getPage(page, pageSize);
    return {
      broadcasts: rows,
      pageCount: Math.ceil(count / pageSize),
    };
  }

  /**
   * GET /broadcasts/:id
   * Return a notification
   * @param id The ID of the notification we want to retrieve
   */
  @UseGuards(AuthGuard)
  @Get(':id')
  async getBroadcast(
    @Param('id') id: string,
  ): Promise<{ broadcast: Broadcast }> {
    const broadcast = await this.broadcastService.getById(id);
    return { broadcast };
  }

  /**
   * GET /broadcasts/:id/recipients
   * Returns a paginated list of recipients for a notification
   * @param id The id of the notification
   * @param page The page number
   * @param pageSize The number of recipients per page
   */
  @UseGuards(AuthGuard)
  @Get(':id/recipients')
  async getBroadcastRecipients(
    @Param('id') id: string,
    @Query('page') page = 0,
    @Query('pageSize') pageSize = 10,
  ): Promise<{
    recipients: Call[];
    pageCount: number;
    meta: BroadcastMeta;
  }> {

    // Paginated list of recipients
    const {
      rows,
      count,
    } = await this.broadcastService.getRecipientsPageByBroadcastId(
      id,
      page,
      pageSize,
    );

    // Meta information such as totals and statuses.
    const meta = await this.broadcastService.getMeta(id);

    return {
      recipients: rows,
      pageCount: Math.ceil(count / pageSize),
      meta,
    };
  }

  /**
   * GET /broadcasts/:id/all-recipients
   * Returns a non-paginated list with all recipients for a broadcast
   * @param id The id of the broadcast
   */
  @UseGuards(AuthGuard)
  @Get(':id/all-recipients')
  async getAllBroadcastRecipients(
    @Param('id') id: string,
  ): Promise<{
    recipients: Call[];
  }> {
    const recipients = await this.broadcastService.getAllRecipientsByBroadcastId(
      id,
    );
    return { recipients };
  }

  /**
   * PATCH /broadcasts/:cancel
   * Cancels the broadcast
   * Any call with status In-progress, Ringing, Initiated and Queued is changed
   * to Canceled so that it never happens.
   * @param id The id of the broadcast
   */
  @UseGuards(AuthGuard)
  @Patch(':id/cancel')
  async cancelBroadcast(@Param('id') id: string): Promise<Broadcast> {
    return this.broadcastService.cancelBroadcast(id);
  }

  /**
   * POST /broadcasts/
   * Creates a new Notification
   * @param friendlyName The name of the notification
   * @param from Caller number
   * @param to Comma-separated list of numbers to call
   * @param message Message to deliver
   */
  @UseGuards(AuthGuard)
  @Post()
  async createBroadcast(
    @Body('friendlyName') friendlyName: string,
    @Body('from') from: string,
    @Body('to') to: string,
    @Body('message') message: string,
    @Headers('referer') fullUrl: string,
    @Res() response: Response,
  ) {
    const baseUrl = new URL(fullUrl);

    // Creates the notification Resource and stores it in DB
    const broadcastId = await this.broadcastService.create(
      friendlyName,
      from,
      message,
    );

    // It uses referer URL from headers to build the voiceUrl callback param
    // when creating the Call resource.
    const statusCallback = url.format({
      protocol: baseUrl.protocol,
      hostname: baseUrl.hostname,
      pathname: '/api/broadcasts/callback',
      query: {
        passCode: this.passCode,
      },
    });

    // Communication with Twilio for calls creation and subsequent INSERTS in
    // database happen in background after the Response has been sent.
    // noinspection ES6MissingAwait
    this.broadcastService.makeCalls(
      broadcastId,
      from,
      message,
      to.split(','),
      statusCallback,
    );

    return response.json({ broadcastId });
  }

  /**
   * POST /broadcasts/callback
   * webhook used by Twilio to communicate every Call status change
   * @param callSid
   * @param status CallStatus
   * @param passCode When creating the CallResource, we ask Twilio to forward
   * the passCode via QueryString in order to "protect" the endpoint.
   */
  @HttpCode(HttpStatus.OK)
  @Post('callback')
  async statusHandler(
    @Body('CallSid') callSid: string,
    @Body('CallStatus') status: string,
    @Query('passCode') passCode: string,
  ): Promise<void> {
    if (passCode !== this.passCode) {
      throw new HttpException('passcode does not match', HttpStatus.FORBIDDEN);
    }

    await this.broadcastService.update(callSid, status);
  }
}
