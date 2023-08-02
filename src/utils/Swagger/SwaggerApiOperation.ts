const SwaggerApiOperation = {
  Create: {
    summary: 'Создание записи',
  },
  CreateUuid: {
    summary: 'Создание записи транзакцией',
  },
  CreateBulk: {
    summary: 'Создание несколько записей за раз',
  },
  CreateBulkUuid: {
    summary: 'Создание несколько записей за раз транзакцией',
  },
  Find: {
    summary: 'Получить список записей',
  },
  FindById: {
    summary: 'Получить запись по id',
  },
  UpdateById: {
    summary: 'Обновление записи по id',
  },
  UpdateByUuid: {
    summary: 'Обновление записи по uuid транзакцией',
  },
  UpdateBulk: {
    summary: 'Обновление записей транзакцией',
  },
  DeleteById: {
    summary: 'Удаление записи по id',
  },
};

export default SwaggerApiOperation;
