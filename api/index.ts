import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import { createServer } from 'http';

const expressAdapter = new ExpressAdapter();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, expressAdapter);

  await app.init();
  return createServer(expressAdapter.getInstance());
}

export default bootstrap;
