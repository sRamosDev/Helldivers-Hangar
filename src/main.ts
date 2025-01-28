import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api', { exclude: ['health', 'health/db'] });
  app.useStaticAssets(path.join(__dirname, '../public/images'), {
    prefix: '/images/',
  });
  const config = new DocumentBuilder()
    .setTitle("Helldiver's Hangar API")
    .setDescription("API documentation for Helldiver's Hangar")
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  await app.listen(3000);
}

bootstrap();
