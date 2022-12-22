import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new ConfigService();
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://example.com'
    ],
    credentials: true,
  });
  await app.listen(await config.getPortConfig());
}
bootstrap();
