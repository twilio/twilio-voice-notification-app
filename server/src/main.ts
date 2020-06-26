import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { E2eModule } from '../e2e/e2e.module';

async function bootstrap() {
  // e2e tests use a special entry Module with fake services and mocks.
  const app = await NestFactory.create(
    process.env.NODE_ENV === 'e2e' ? E2eModule : AppModule,
  );

  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
