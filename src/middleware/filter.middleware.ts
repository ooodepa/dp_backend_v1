import { INestApplication } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/utils/HttpExceptionFilter';

export default function setupFilter(app: INestApplication) {
  app.useGlobalFilters(new HttpExceptionFilter());
}
