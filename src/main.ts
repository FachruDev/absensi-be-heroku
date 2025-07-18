// main.ts
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');
  app.use(cookieParser());

  const origin = configService.get<string>('CORS_ORIGIN');
  const allowedOrigins = origin?.split(',').map((o) => o.trim());

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(4000);
}
bootstrap();
