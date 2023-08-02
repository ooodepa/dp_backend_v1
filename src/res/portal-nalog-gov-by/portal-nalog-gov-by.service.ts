import axios from 'axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import GetUnpDto from './dto/get-unp.dto';
import HttpResponseDto from 'src/utils/HttpResponseDto/HttpResponseDto.dto';

@Injectable()
export class PortalNalogGovByService {
  async findOne(unp: string) {
    const url = `http://grp.nalog.gov.by/api/grp-public/data?unp=${unp}`;
    try {
      const response = await axios.get(url);

      if (response.status === 200) {
        if (response.data.length === 0) {
          const status = HttpStatus.NOT_FOUND;
          const dto: HttpResponseDto = {
            message: 'УНП не найден',
            statusCode: status,
          };
          throw new HttpException(dto, status);
        }

        const json: GetUnpDto = response.data;
        return json;
      }
    } catch (exception) {
      const status = HttpStatus.NOT_FOUND;
      const dto: HttpResponseDto = {
        message: 'УНП не найден',
        statusCode: status,
      };
      throw new HttpException(dto, status);
    }
  }
}
