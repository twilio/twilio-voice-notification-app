import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from './login.controller';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { ConfigModule } from '../test-modules/config-module';

describe('LoginController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [LoginController],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('should return 200 given the correct passcode', () => {
    return request(app.getHttpServer())
      .post('/login')
      .send({ passcode: '12345' })
      .expect(HttpStatus.OK);
  });

  it('should return 403 given a wrong passcode', () => {
    return request(app.getHttpServer())
      .post('/login')
      .send({ passcode: 'wrong' })
      .expect(HttpStatus.UNAUTHORIZED)
      .then(response => {
        expect(response?.body?.message).toBe('Passcode is incorrect.');
      });
  });

  it('should return 403 if no passcode is passed', () => {
    return request(app.getHttpServer())
      .post('/login')
      .expect(HttpStatus.UNAUTHORIZED);
  });
});
