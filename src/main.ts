import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { RedisIoAdapter } from './adapters/redis-io.adapter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('JS Code Api')
    .setDescription('JS Code Video Tutorial endpoints')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.enableCors({ origin: '*', methods: [ 'POST', 'GET' ], credentials: false });
  app.useWebSocketAdapter(new RedisIoAdapter(app));

  await app.listen(3001);
  // console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
