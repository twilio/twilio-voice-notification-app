import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { BroadcastService as FakeBroadcastService } from '../test-modules/broadcast.service';
import { ConfigService } from '@nestjs/config';
import { configService } from '../test-modules/config-module';
import { BroadcastsController } from './broadcast.controller';
import { BroadcastService } from './broadcast.service';
import { CallStatus } from '../types/call-status';

import {
  BROADCAST_GET_BY_ID_RESPONSE,
  BROADCAST_GET_META,
  BROADCAST_GET_PAGE_RESPONSE,
  BROADCAST_GET_RECIPIENTS_BY_PAGE,
  TEST_BROADCAST_ID,
} from '../test-modules/fixtures';

describe('Broadcasts Controller', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ConfigService,
          useValue: configService,
        },
        {
          provide: BroadcastService,
          useValue: FakeBroadcastService,
        },
      ],
      controllers: [BroadcastsController],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('GET /broadcasts', () => {
    it('should return the list of broadcasts for a specific page', () => {
      return request(app.getHttpServer())
        .get('/broadcasts')
        .query({ page: 1, pageSize: 2 })
        .set('x-twilio-notification-key', '12345')
        .expect(HttpStatus.OK)
        .then(response =>
          expect(response.text).toBe(
            JSON.stringify({
              broadcasts: BROADCAST_GET_PAGE_RESPONSE.rows,
              pageCount: 3,
            }),
          ),
        );
    });

    it('should be secured', () => {
      return request(app.getHttpServer())
        .get('/broadcasts')
        .expect(HttpStatus.FORBIDDEN);
    });
  });

  describe('GET /broadcasts/:id', () => {
    it('should return an specific broadcast by id', () => {
      return request(app.getHttpServer())
        .get('/broadcasts/1')
        .set('x-twilio-notification-key', '12345')
        .expect(HttpStatus.OK)
        .then(response =>
          expect(response.text).toBe(
            JSON.stringify({ broadcast: BROADCAST_GET_BY_ID_RESPONSE }),
          ),
        );
    });

    it('should be secured', () => {
      return request(app.getHttpServer())
        .get('/broadcasts/1')
        .expect(HttpStatus.FORBIDDEN);
    });
  });

  describe('GET /broadcasts/:id/recipients', () => {
    it('should return a list of recipients', () => {
      return request(app.getHttpServer())
        .get('/broadcasts/1/recipients')
        .query({ page: 1, pageSize: 2 })
        .set('x-twilio-notification-key', '12345')
        .expect(HttpStatus.OK)
        .then(response =>
          expect(response.text).toBe(
            JSON.stringify({
              recipients: BROADCAST_GET_RECIPIENTS_BY_PAGE.rows,
              pageCount: 2,
              meta: BROADCAST_GET_META,
            }),
          ),
        );
    });

    it('should be secured', () => {
      return request(app.getHttpServer())
        .get('/broadcasts/1/recipients')
        .expect(HttpStatus.FORBIDDEN);
    });
  });

  describe('POST /broadcasts', () => {
    const friendlyName = 'test-message';
    const from = '+10000000';
    const recipient1 = '+10000001';
    const recipient2 = '+10000002';
    const to = `${recipient1},${recipient2}`;
    const message = 'Test message';
    const referer = 'http://www.test-url.com';

    it('should create the broadcast and make the calls with the right status callback', async () => {
      await request(app.getHttpServer())
        .post('/broadcasts')
        .send({
          friendlyName,
          from,
          to,
          message,
        })
        .set('x-twilio-notification-key', '12345')
        .set('referer', referer)
        .expect(HttpStatus.CREATED);

      expect(FakeBroadcastService.makeCalls).toHaveBeenCalledWith(
        TEST_BROADCAST_ID,
        from,
        message,
        [recipient1, recipient2],
        'http://www.test-url.com/api/broadcasts/callback?passCode=12345',
      );
    });
  });

  describe('GET /broadcasts/callback', () => {
    it('should return 403 if the provided passcode is incorrect', () => {
      return request(app.getHttpServer())
        .post('/broadcasts/callback')
        .query({ passcode: 'wrong' })
        .expect(HttpStatus.FORBIDDEN);
    });

    it('should call the service to update the call status', async () => {
      const CallSid = 'C00001';
      const status = CallStatus.IN_PROGRESS;

      await request(app.getHttpServer())
        .post('/broadcasts/callback')
        .send({
          CallSid,
          CallStatus: status,
        })
        .query({
          passCode: '12345',
        })
        .expect(HttpStatus.OK);

      expect(FakeBroadcastService.update).toHaveBeenCalledWith(CallSid, status);
    });
  });
});
