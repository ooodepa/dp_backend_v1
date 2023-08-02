import { HttpStatus } from '@nestjs/common';

import HttpResponseDto from 'src/utils/HttpResponseDto/HttpResponseDto.dto';

const SwaggerApiResponse = {
  Created: {
    status: HttpStatus.CREATED,
    description: 'Запись создана успешно',
    type: HttpResponseDto,
  },
  CreatedUuid: {
    status: HttpStatus.CREATED,
    description: 'Запись создана успешно. Транзакция выполнена.',
    type: HttpResponseDto,
  },
  CreatedBulk: {
    status: HttpStatus.CREATED,
    description: 'Записи добавлены в БД',
    type: HttpResponseDto,
  },
  CreatedBulkUuid: {
    status: HttpStatus.CREATED,
    description: 'Записи добавлены в БД. Транзакция выполнена.',
    type: HttpResponseDto,
  },
  Finded: {
    status: HttpStatus.OK,
    description: 'Получили список записей',
  },
  FindedById: {
    status: HttpStatus.OK,
    description: 'Получили запись по id',
  },
  UpdatedById: {
    status: HttpStatus.OK,
    description: 'Обновили запись по id',
    type: HttpResponseDto,
  },
  UpdatedByUuid: {
    status: HttpStatus.OK,
    description: 'Обновили запись по uuid. Транзакция выполнена.',
    type: HttpResponseDto,
  },
  UpdatedBulk: {
    status: HttpStatus.OK,
    description: 'Обновили записи. Транзакция выполнена.',
    type: HttpResponseDto,
  },
  DeletedById: {
    status: HttpStatus.OK,
    description: 'Удалили запись по id',
    type: HttpResponseDto,
  },
  NotFound: {
    status: HttpStatus.NOT_FOUND,
    description: 'Запись не найдена',
    type: HttpResponseDto,
  },
  ServerError: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Что-то пошло не так на сервере.',
    type: HttpResponseDto,
  },
  ServerErrorAndTransaction: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Транзакция не выполнена.' + 'Что-то пошло не так на сервере.',
    type: HttpResponseDto,
  },
  ValidationError: {
    status: HttpStatus.BAD_REQUEST,
    description: 'Не верный формат данных в JSON',
    type: HttpResponseDto,
  },
  DublicateError: {
    status: HttpStatus.CONFLICT,
    description: 'В БД уже есть запись с таким полем',
    type: HttpResponseDto,
  },
  Unauthorized: {
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access токен просрочен \n\n' + 'Access токен не передан \n\n',
    type: HttpResponseDto,
  },
  UnauthorizedAdmin: {
    status: HttpStatus.UNAUTHORIZED,
    description:
      'Access токен просрочен \n\n' +
      'Access токен не передан \n\n' +
      'У пользователя нет роли администратора \n\n',
    type: HttpResponseDto,
  },
  UnauthorizedManager: {
    status: HttpStatus.UNAUTHORIZED,
    description:
      'Access токен просрочен \n\n' +
      'Access токен не передан \n\n' +
      'У пользователя нет роли менеджера \n\n',
    type: HttpResponseDto,
  },
};

export default SwaggerApiResponse;
