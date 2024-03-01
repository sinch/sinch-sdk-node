import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false
  });
  const rawBodyBuffer = (req, res, buf, encoding) => {
    if (buf && buf.length) {
      req.rawBody = buf.toString(encoding || 'utf8');
    }
  };
  app.use(bodyParser.urlencoded({verify: rawBodyBuffer, extended: true, limit: '10mb' }));
  app.use(bodyParser.json({ verify: rawBodyBuffer, limit: '10mb' }));

  await app.listen(3000);
}
bootstrap();
