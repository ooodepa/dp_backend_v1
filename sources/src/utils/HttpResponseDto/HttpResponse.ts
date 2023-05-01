import { HttpStatus } from '@nestjs/common';

import HttpResponseDto from '../HttpResponseDto/HttpResponseDto.dto';

export default class HttpResponse {
  static successCreate() {
    const message = `Сущность успешно создана`;
    const status = HttpStatus.OK;

    const answer: HttpResponseDto = {
      statusCode: status,
      message: message,
    };

    return answer;
  }

  static successTransactionCreate() {
    const message = `Сущность успешно создана. Транзакция выполнена успешно`;
    const status = HttpStatus.OK;

    const answer: HttpResponseDto = {
      statusCode: status,
      message: message,
    };

    return answer;
  }

  static successBulkCreate() {
    const message = `Сущности успешно созданы`;
    const status = HttpStatus.OK;

    const answer: HttpResponseDto = {
      statusCode: status,
      message: message,
    };

    return answer;
  }

  static successBulkTransactionCreate() {
    const message = `Сущности успешно созданы. Транзакция выполнена успешно`;
    const status = HttpStatus.OK;

    const answer: HttpResponseDto = {
      statusCode: status,
      message: message,
    };

    return answer;
  }

  static successUpdate() {
    const message = `Сущность обновлена`;
    const status = HttpStatus.OK;

    const answer: HttpResponseDto = {
      statusCode: status,
      message: message,
    };

    return answer;
  }

  static successTransactionUpdate() {
    const message = `Сущность обновлена. Транзакция выполнена успешно.`;
    const status = HttpStatus.OK;

    const answer: HttpResponseDto = {
      statusCode: status,
      message: message,
    };

    return answer;
  }

  static successBulkUpdate() {
    const message = `Обновление нескольких записей выполнены транзакцией успешно`;
    const status = HttpStatus.OK;

    const answer: HttpResponseDto = {
      statusCode: status,
      message: message,
    };

    return answer;
  }

  static successDeleted() {
    const message = `Сущность успешно удалена`;
    const status = HttpStatus.OK;

    const answer: HttpResponseDto = {
      statusCode: status,
      message: message,
    };

    return answer;
  }
}
