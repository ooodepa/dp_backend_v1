import { Response } from 'express';
import { plainToClass } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';
import { LanguageEntity } from 'src/entities/language.entity';
import HttpResponseDto from '../../../dto/http-response.dto';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import QueryPaginationDto from 'src/dto/query-pagination.dto';
import UpdateBulkLanguageDto from './dto/update-bulk-language.dto';
import DeleteBulkLanguageDto from './dto/delete-bulk-language.dto';
import { CreateBulkLanguageDto } from './dto/create-bulk-language.dto';
import UpdateLanguageWithIdDto from './dto/update-language-with-id.dto';
import HttpPaginationResponseDto from 'src/dto/http-pagination-response.dto';
import getStatusByStatusCode from 'src/utils/getStatusByStatusCode/getStatusByStatusCode';

@Injectable()
export class LanguagesService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(LanguageEntity)
    private readonly repository_language: Repository<LanguageEntity>,
  ) {}

  async createBulk(res: Response, dto: CreateBulkLanguageDto) {
    const clear_array_dto: CreateLanguageDto[] = [];

    const arr = dto.bulk;
    for (let i = 0; i < arr.length; ++i) {
      const clear_dto = plainToClass(CreateLanguageDto, arr[i], {
        strategy: 'excludeAll',
      });
      clear_array_dto.push(clear_dto);
    }

    const result = await this.repository_language.insert(clear_array_dto);

    const statusCode = HttpStatus.CREATED;
    const status = getStatusByStatusCode(statusCode);
    const response: HttpResponseDto = {
      statusCode,
      status,
      data: result,
    };

    res.status(statusCode).send(response);
  }

  async create(res: Response, dto: CreateLanguageDto) {
    const clear_dto = plainToClass(CreateLanguageDto, dto, {
      strategy: 'excludeAll',
    });
    const result = await this.repository_language.save(clear_dto);

    const statusCode = HttpStatus.CREATED;
    const status = getStatusByStatusCode(statusCode);
    const response: HttpResponseDto = {
      statusCode,
      status,
      data: result,
    };

    res.status(statusCode).send(response);
  }

  async findAll(res: Response, query: QueryPaginationDto) {
    const PAGE = Number(query.page) || 1;
    const LIMIT = Number(query.limit) || 20;
    const SKIP = LIMIT * (PAGE - 1);

    const [ITEMS, TOTAL] = await this.repository_language.findAndCount({
      skip: SKIP,
      take: LIMIT,
    });

    const LAST_PAGE = Math.ceil(TOTAL / LIMIT);

    const statusCode = HttpStatus.OK;
    const status = getStatusByStatusCode(statusCode);
    const response: HttpPaginationResponseDto = {
      status,
      statusCode,
      data: ITEMS,
      pagination: {
        current_page: PAGE,
        last_page: LAST_PAGE,
        limit_items: LIMIT,
        skip_items: SKIP,
        total_items: TOTAL,
      },
    };

    res.status(statusCode).send(response);
  }

  async findOne(res: Response, id: number) {
    const item = await this.repository_language.findOneOrFail({
      where: { ph_id: id },
    });

    const statusCode = HttpStatus.OK;
    const status = getStatusByStatusCode(statusCode);
    const response: HttpResponseDto = {
      statusCode,
      status,
      data: item,
    };

    res.status(statusCode).send(response);
  }

  async updateBulk(res: Response, dto: UpdateBulkLanguageDto) {
    const arr = dto.bulk;
    const ids = arr.map((e) => e.ph_id);
    const candidates = await this.repository_language.find({
      where: { ph_id: In(ids) },
    });

    if (candidates.length !== arr.length) {
      const statusCode = HttpStatus.NOT_FOUND;
      const status = getStatusByStatusCode(statusCode);
      const response: HttpResponseDto = {
        statusCode,
        status,
        data: {
          message: 'Not all ids finded',
        },
      };
      res.status(statusCode).send(response);
      return;
    }

    const clear_array_dto: UpdateLanguageWithIdDto[] = [];
    for (let i = 0; i < arr.length; ++i) {
      const clear_dto = plainToClass(UpdateLanguageWithIdDto, arr[i], {
        strategy: 'excludeAll',
      });
      clear_array_dto.push(clear_dto);
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      for (let i = 0; i < clear_array_dto.length; ++i) {
        const id = clear_array_dto[i].ph_id;
        const clear_dto = plainToClass(UpdateLanguageDto, clear_array_dto[i], {
          strategy: 'excludeAll',
        });
        await queryRunner.manager
          .getRepository(LanguageEntity)
          .update(id, clear_dto);
      }

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();

      const statusCode = HttpStatus.CONFLICT;
      const status = getStatusByStatusCode(statusCode);

      const response: HttpResponseDto = {
        statusCode,
        status,
        data: {
          err: '' + err,
        },
      };

      res.status(statusCode).send(response);

      return;
    } finally {
      await queryRunner.release();
    }

    const statusCode = HttpStatus.OK;
    const status = getStatusByStatusCode(statusCode);

    const response: HttpResponseDto = {
      statusCode,
      status,
      data: {
        update_fields: clear_array_dto,
        item_before: candidates,
      },
    };

    res.status(statusCode).send(response);
  }

  async update(res: Response, id: number, dto: UpdateLanguageDto) {
    const candidate = await this.repository_language.findOneOrFail({
      where: { ph_id: id },
    });

    const clear_dto = plainToClass(CreateLanguageDto, dto, {
      strategy: 'excludeAll',
    });
    const result = await this.repository_language.update(id, clear_dto);

    const statusCode = HttpStatus.OK;
    const status = getStatusByStatusCode(statusCode);

    const response: HttpResponseDto = {
      statusCode,
      status,
      data: {
        update_fields: clear_dto,
        item_before: candidate,
        update_result: result,
      },
    };

    res.status(statusCode).send(response);
  }

  async removeBulk(res: Response, dto: DeleteBulkLanguageDto) {
    const arr = dto.bulk;
    const ids = arr.map((e) => e.ph_id);
    const candidates = await this.repository_language.find({
      where: { ph_id: In(ids) },
    });

    if (candidates.length !== arr.length) {
      const statusCode = HttpStatus.NOT_FOUND;
      const status = getStatusByStatusCode(statusCode);
      const response: HttpResponseDto = {
        statusCode,
        status,
        data: {
          message: 'Not all ids finded',
        },
      };
      res.status(statusCode).send(response);
      return;
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager
        .getRepository(LanguageEntity)
        .delete({ ph_id: In(ids) });

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();

      const statusCode = HttpStatus.CONFLICT;
      const status = getStatusByStatusCode(statusCode);

      const response: HttpResponseDto = {
        statusCode,
        status,
        data: {
          err: '' + err,
        },
      };

      res.status(statusCode).send(response);

      return;
    } finally {
      await queryRunner.release();
    }

    const statusCode = HttpStatus.OK;
    const status = getStatusByStatusCode(statusCode);

    const response: HttpResponseDto = {
      statusCode,
      status,
      data: {
        delete_ids: ids,
      },
    };

    res.status(statusCode).send(response);
  }

  async remove(res: Response, id: number) {
    const candidate = await this.repository_language.findOneOrFail({
      where: { ph_id: id },
    });

    const result = await this.repository_language.delete(id);

    const statusCode = HttpStatus.OK;
    const status = getStatusByStatusCode(statusCode);

    const response: HttpResponseDto = {
      statusCode,
      status,
      data: {
        id,
        item_before: candidate,
        delete_result: result,
      },
    };

    res.status(statusCode).send(response);
  }
}
