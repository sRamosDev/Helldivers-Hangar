import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api', { exclude: ['health', 'health/db'] });
  app.useStaticAssets(path.join(__dirname, '../public/images'), {
    prefix: '/images/',
  });
  await app.listen(3000);
}

bootstrap();
