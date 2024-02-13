import * as fs from 'fs';
import * as bodyParser from 'body-parser';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';

import config from './swagger.config';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './utils/HttpExceptionFilter';

async function bootstrap() {
  const PORT = process.env.APP__PORT || 3000;
  const app = await NestFactory.create(AppModule);

  app.use(bodyParser.json({ limit: '20mb' }));

  app.enableCors();

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const errorResponse = {
          statusCode: 400,
          message: '',
          error: 'Bad Request',
        };

        const array = [];
        errors.forEach((error) => {
          const messages = error.constraints
            ? Object.values(error.constraints)
            : ['Validation failed'];

          array.push(...messages);
        });

        errorResponse.message = array[0];

        const message = array[0];
        const status = HttpStatus.BAD_REQUEST;
        throw new HttpException(message, status);

        // return errorResponse;
      },
    }),
  );

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/v1', app, document);
  fs.writeFileSync('./swagger.json', JSON.stringify(document, null, 2));

  await app.listen(PORT, () => {
    console.log(`Server started: http://localhost:${PORT}/api/v1`);
  });
}
bootstrap();
