import axios, { AxiosError } from 'axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import GetUnpDto from './dto/get-unp.dto';
import HttpResponseDto from 'src/utils/HttpResponseDto/HttpResponseDto.dto';

@Injectable()
export class PortalNalogGovByService {
  async findOne(unp: string) {
    try {
      const url = `https://www.portal.nalog.gov.by/grp/getData?unp=${unp}&charset=UTF-8&type=json`;
      const response = await axios.get(url);

      if (response.status === 200) {
        const json: GetUnpDto = response.data;
        return json;
      }
    } catch (exception) {
      if (exception instanceof AxiosError) {
        if (exception.response.status === 404) {
          const status = HttpStatus.NOT_FOUND;
          const dto: HttpResponseDto = {
            message: 'УНП не найден',
            statusCode: status,
          };
          throw new HttpException(dto, status);
        }

        const status = exception.response.status;
        const dto: HttpResponseDto = {
          message: 'Запрос на сервер portal.nalog.gov.by произошел с ошибкой',
          statusCode: status,
        };
        throw new HttpException(dto, status);
      }
      throw exception;
    }
  }
}
