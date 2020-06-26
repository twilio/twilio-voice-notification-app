import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { TwilioService as FakeTwilioService } from '../test-modules/twilio-service';
import { ConfigService } from '@nestjs/config';
import { configService } from '../test-modules/config-module';
import { PHONE_NUMBERS } from '../test-modules/fixtures';
import { TwilioService } from '../twilio/twilio.service';
import { NumbersController } from './numbers.controller';

describe('Numbers Controller', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: TwilioService,
          useValue: FakeTwilioService,
        },
        {
          provide: ConfigService,
          useValue: configService,
        },
      ],
      controllers: [NumbersController],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('should return a list of numbers available for the account', () => {
    return request(app.getHttpServer())
      .get('/numbers')
      .set('x-twilio-notification-key', '12345')
      .expect(HttpStatus.OK)
      .then(response =>
        expect(response.text).toBe(JSON.stringify(PHONE_NUMBERS)),
      );
  });

  it('should be secured', () => {
    return request(app.getHttpServer())
      .get('/numbers')
      .expect(HttpStatus.FORBIDDEN);
  });
});
