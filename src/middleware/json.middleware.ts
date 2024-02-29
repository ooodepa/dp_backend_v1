import * as bodyParser from 'body-parser';
import { INestApplication } from '@nestjs/common';

export default function setupJSON(app: INestApplication) {
  app.use(bodyParser.json({ limit: '20mb' }));
  app.enableCors();
}
