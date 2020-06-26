import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TestCallService } from './test-call.service';
import { ConfigModule } from '../test-modules/config-module';
import { TwilioService as FakeTwilioService } from '../test-modules/twilio-service';
import { TestCallGateway } from './test-call.gateway';
import { getModelToken } from '@nestjs/sequelize';
import { TestCall } from './test-call.model';

import { TEST_CALL_CREATE_CALL_RESPONSE } from '../test-modules/fixtures';
import { TwilioService } from '../twilio/twilio.service';

const mockRepository = {
  create: jest.fn().mockReturnValue(Promise.resolve(1)),
};

describe('TestCall Service', () => {
  let app: INestApplication;

  const message = 'Test message';
  const to = '+1000001';
  const from = '+1000002';
  const statusCallback = 'http://www.test-url.com/';

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        TestCallService,
        TestCallGateway,
        {
          provide: TwilioService,
          useValue: FakeTwilioService,
        },
        {
          provide: getModelToken(TestCall),
          useValue: mockRepository,
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test('createCall', async () => {
    const testCallService = app.get<TestCallService>(TestCallService);
    const twilioService = app.get<TwilioService>(TwilioService);
    await testCallService.create(to, from, message, statusCallback);

    expect(twilioService.createCall).toHaveBeenCalledWith(
      statusCallback,
      to,
      from,
      message,
    );

    expect(mockRepository.create).toHaveBeenCalledWith({
      callSid: TEST_CALL_CREATE_CALL_RESPONSE.callSid,
      from,
      message,
      status: TEST_CALL_CREATE_CALL_RESPONSE.status,
      to,
    });
  });
});
