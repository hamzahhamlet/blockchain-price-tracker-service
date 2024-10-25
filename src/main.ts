import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import Moralis from 'moralis';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
  });

  await app.listen(3000);

  console.log('Application is running on PORT: 3000');
}
bootstrap();
