import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';

import { HelperEntity } from './entities/helper.entity';
import { CreateHelperDto } from './dto/create-helper.dto';
import { UpdateHelperDto } from './dto/update-helper.dto';
import HttpResponse from 'src/utils/HttpResponseDto/HttpResponse';
import HttpExceptions from 'src/utils/HttpResponseDto/HttpException';
import { LstHelperCommunicationTypeEntity } from './entities/LstHelperCommunicationTypeEntity.entity';

@Injectable()
export class HelpersService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(HelperEntity)
    private readonly itemEntity: Repository<HelperEntity>,
  ) {}

  async create(dto: CreateHelperDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const savedItem = await queryRunner.manager
        .getRepository(HelperEntity)
        .save(dto);

      const uuid = savedItem.dp_id;

      dto.dp_helperContactTypes.forEach((e) => {
        e.dp_helperId = uuid;
      });
      await queryRunner.manager
        .getRepository(LstHelperCommunicationTypeEntity)
        .insert(dto.dp_helperContactTypes);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      HttpExceptions.exceptionTransaction(err);
    } finally {
      await queryRunner.release();
    }

    return HttpResponse.successTransactionCreate();
  }

  async createBulk(bulk: CreateHelperDto[]) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      for (let i = 0; i < bulk.length; ++i) {
        const savedItem = await queryRunner.manager
          .getRepository(HelperEntity)
          .save(bulk[i]);

        const uuid = savedItem.dp_id;

        bulk[i].dp_helperContactTypes.forEach((e) => {
          e.dp_helperId = uuid;
        });

        await queryRunner.manager
          .getRepository(LstHelperCommunicationTypeEntity)
          .insert(bulk[i].dp_helperContactTypes);
      }
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      HttpExceptions.exceptionTransaction(err);
    } finally {
      await queryRunner.release();
    }

    return HttpResponse.successBulkCreate();
  }

  async findAll() {
    return await this.itemEntity.find({
      relations: ['dp_helperContactTypes'],
      order: { dp_sortingIndex: 'ASC' },
    });
  }

  async findOne(id: string) {
    return await this.itemEntity.findOneOrFail({
      where: { dp_id: id },
      relations: ['dp_helperContactTypes'],
    });
  }

  async update(uuid: string, dto: UpdateHelperDto) {
    await this.itemEntity.findOneOrFail({
      where: { dp_id: uuid },
      relations: ['dp_helperContactTypes'],
    });

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      dto.dp_id = uuid;

      await queryRunner.manager
        .getRepository(LstHelperCommunicationTypeEntity)
        .delete({ dp_helperId: uuid });

      await queryRunner.manager.getRepository(HelperEntity).save(dto);

      dto.dp_helperContactTypes.forEach((e) => {
        e.dp_helperId = uuid;
      });

      await queryRunner.manager
        .getRepository(LstHelperCommunicationTypeEntity)
        .save(dto.dp_helperContactTypes);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      HttpExceptions.exceptionTransaction(err);
    } finally {
      await queryRunner.release();
    }

    return HttpResponse.successTransactionUpdate();
  }

  async remove(id: string) {
    await this.itemEntity.findOneOrFail({
      where: { dp_id: id },
      relations: ['dp_helperContactTypes'],
    });
    await this.itemEntity.delete(id);
  }
}
