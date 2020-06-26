import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { TestCallController } from './test-call.controller';
import { TestCallService } from './test-call.service';
import { TestCallService as FakeTestCallService } from '../test-modules/test-call.service';
import { ConfigModule } from '../test-modules/config-module';

describe('TestCall Controller', () => {
  let app: INestApplication;

  const message = 'Test message';
  const to = '+1000001';
  const from = '+1000002';
  const referer = 'http://www.test-url.com/';

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        {
          provide: TestCallService,
          useValue: FakeTestCallService,
        },
      ],
      controllers: [TestCallController],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('should call the service with the right parameters', async () => {
    const testCallService = app.get<TestCallService>(TestCallService);

    await request(app.getHttpServer())
      .post('/test-call')
      .set('x-twilio-notification-key', '12345')
      .set('referer', referer)
      .send({ message, to, from })
      .expect(HttpStatus.OK);

    expect(testCallService.create).toHaveBeenCalledWith(
      to,
      from,
      message,
      'http://www.test-url.com/api/test-call/callback',
    );
  });

  it('should return 500 if referer is not present in the headers object', () => {
    return request(app.getHttpServer())
      .post('/test-call')
      .set('x-twilio-notification-key', '12345')
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it('should be secured', () => {
    return request(app.getHttpServer())
      .post('/test-call')
      .expect(HttpStatus.FORBIDDEN);
  });
});
