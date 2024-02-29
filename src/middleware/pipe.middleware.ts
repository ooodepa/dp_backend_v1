import {
  HttpException,
  HttpStatus,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';

export default function setupPipe(app: INestApplication) {
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
}
