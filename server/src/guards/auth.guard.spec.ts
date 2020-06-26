import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { ConfigModule } from '../test-modules/config-module';
import { AuthGuard } from './auth.guard';

import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  INestApplication,
  UseGuards,
} from '@nestjs/common';

@Controller('fake')
class FakeController {
  @HttpCode(HttpStatus.OK)
  @Get()
  @UseGuards(AuthGuard)
  fakeMethod() {
    return 'foo bar';
  }
}

describe('Auth Guard', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [AuthGuard],
      controllers: [FakeController],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`should pass through to the controller given the right passcode`, async () => {
    return request(app.getHttpServer())
      .get('/fake')
      .set('x-twilio-notification-key', '12345')
      .expect(HttpStatus.OK)
      .then(response => expect(response?.text).toBe('foo bar'));
  });

  it(`should return forbidden given the wrong passcode`, async () => {
    return request(app.getHttpServer())
      .get('/fake')
      .set('x-twilio-notification-key', 'wrong')
      .expect(HttpStatus.FORBIDDEN);
  });
});
