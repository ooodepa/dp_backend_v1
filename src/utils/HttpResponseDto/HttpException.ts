import { HttpException, HttpStatus } from '@nestjs/common';

export default class HttpExceptions {
  static notFoundBulkItems() {
    const message = 'Не все записи переданные в bulk с dp_id есть в БД';
    const status = HttpStatus.NOT_FOUND;
    throw new HttpException(message, status);
  }

  static exceptionTransaction(err: string) {
    const message = `Транзакция не выполнена err=(${err})`;
    const status = HttpStatus.UNPROCESSABLE_ENTITY;
    throw new HttpException(message, status);
  }
}
