import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpStatus } from '@nestjs/common';
import { DataSource, In, Like, Repository } from 'typeorm';

import ItemWithIdDto from './dto/item-with-id.dto';
import { ItemEntity } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { FilterItemDto } from './dto/filter-item.dto';
import { FindItemIdsDto } from './dto/find-item-ids.dto';
import { FindItemModelsDto } from './dto/find-item-models.dto';
import HttpResponse from 'src/utils/HttpResponseDto/HttpResponse';
import { LstItemGaleryEntity } from './entities/item-galery.entity';
import HttpExceptions from 'src/utils/HttpResponseDto/HttpException';
import { LstItemCharacteristicEntity } from './entities/item-characteristics.entity';
import { ItemCategoryEntity } from '../item-categories/entities/item-category.entity';

@Injectable()
export class ItemsService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(ItemEntity)
    private readonly itemEntity: Repository<ItemEntity>,
    @InjectRepository(ItemCategoryEntity)
    private readonly itemCategoryEntity: Repository<ItemCategoryEntity>,
  ) {}

  async create(dto: CreateItemDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const savedItem = await queryRunner.manager
        .getRepository(ItemEntity)
        .save(dto);

      const uuid = savedItem.dp_id;

      dto.dp_itemCharacteristics.forEach((e) => {
        e.dp_itemId = uuid;
      });

      await queryRunner.manager
        .getRepository(LstItemCharacteristicEntity)
        .save(dto.dp_itemCharacteristics);

      dto.dp_itemGalery.forEach((e) => {
        e.dp_itemId = uuid;
      });

      await queryRunner.manager
        .getRepository(LstItemGaleryEntity)
        .save(dto.dp_itemGalery);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      HttpExceptions.exceptionTransaction(err);
    } finally {
      await queryRunner.release();
    }

    return HttpResponse.successTransactionCreate();
  }

  async createBulk(bulk: CreateItemDto[]) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      for (let i = 0; i < bulk.length; ++i) {
        const savedItem = await queryRunner.manager
          .getRepository(ItemEntity)
          .save(bulk[i]);

        const uuid = savedItem.dp_id;

        bulk[i].dp_itemCharacteristics.forEach((e) => {
          e.dp_itemId = uuid;
        });

        await queryRunner.manager
          .getRepository(LstItemCharacteristicEntity)
          .save(bulk[i].dp_itemCharacteristics);

        bulk[i].dp_itemGalery.forEach((e) => {
          e.dp_itemId = uuid;
        });

        await queryRunner.manager
          .getRepository(LstItemGaleryEntity)
          .save(bulk[i].dp_itemGalery);
      }
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      HttpExceptions.exceptionTransaction(err);
    } finally {
      await queryRunner.release();
    }

    return HttpResponse.successTransactionCreate();
  }

  async findAll(filter: FilterItemDto) {
    if (filter.category) {
      const candidate = await this.itemCategoryEntity.findOne({
        where: { dp_urlSegment: filter.category },
      });

      if (!candidate) {
        return [];
      }

      filter.dp_itemCategoryId = `${candidate.dp_id}`;
    }

    return await this.itemEntity.find({
      where: {
        dp_model: filter.dp_model,

        dp_itemCategoryId: filter.dp_itemCategoryId
          ? Number(filter.dp_itemCategoryId)
          : undefined,
      },
      relations: ['dp_itemCharacteristics', 'dp_itemGalery'],
      order: { dp_model: 'ASC' },
    });
  }

  async findOneByModel(model: string) {
    await this.itemEntity.findOneOrFail({ where: { dp_model: model } });
    return await this.itemEntity.findOne({
      where: { dp_model: model },
      relations: ['dp_itemCharacteristics', 'dp_itemGalery'],
    });
  }

  async findModels(dto: FindItemModelsDto, res: Response) {
    const status = HttpStatus.OK;
    const json = await this.itemEntity.find({
      where: { dp_model: In(dto.models) },
      relations: ['dp_itemCharacteristics', 'dp_itemGalery'],
      order: { dp_model: 'DESC' },
    });
    res.status(status).send(json);
  }

  async findIds(dto: FindItemIdsDto, res: Response) {
    const status = HttpStatus.OK;
    const json = await this.itemEntity.find({
      where: { dp_id: In(dto.ids) },
      relations: ['dp_itemCharacteristics', 'dp_itemGalery'],
      order: { dp_model: 'DESC' },
    });
    res.status(status).send(json);
  }

  async search(search: string, res: Response) {
    const status = HttpStatus.OK;
    const json = await this.itemEntity.find({
      where: [
        { dp_model: Like(`%${search}%`) },
        { dp_name: Like(`%${search}%`) },
      ],
      take: 5,
    });
    res.status(status).send(json);
  }

  async searchAll(search: string, res: Response) {
    const status = HttpStatus.OK;
    const json = await this.itemEntity.find({
      where: [
        { dp_model: Like(`%${search}%`) },
        { dp_name: Like(`%${search}%`) },
      ],
      relations: ['dp_itemCharacteristics', 'dp_itemGalery'],
    });
    res.status(status).send(json);
  }

  async findOne(id: string) {
    await this.itemEntity.findOneOrFail({ where: { dp_id: id } });
    return await this.itemEntity.findOne({
      where: { dp_id: id },
      relations: ['dp_itemCharacteristics', 'dp_itemGalery'],
    });
  }

  async update(uuid: string, dto: UpdateItemDto) {
    await this.itemEntity.findOneOrFail({ where: { dp_id: uuid } });

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      dto.dp_id = uuid;

      await queryRunner.manager
        .getRepository(LstItemCharacteristicEntity)
        .delete({ dp_itemId: uuid });

      await queryRunner.manager
        .getRepository(LstItemGaleryEntity)
        .delete({ dp_itemId: uuid });

      await queryRunner.manager.getRepository(ItemEntity).save(dto);

      dto.dp_itemCharacteristics.forEach((e) => {
        e.dp_itemId = uuid;
      });

      await queryRunner.manager
        .getRepository(LstItemCharacteristicEntity)
        .insert(dto.dp_itemCharacteristics);

      dto.dp_itemGalery.forEach((e) => {
        e.dp_itemId = uuid;
      });

      await queryRunner.manager
        .getRepository(LstItemGaleryEntity)
        .insert(dto.dp_itemGalery);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      HttpExceptions.exceptionTransaction(err);
    } finally {
      await queryRunner.release();
    }

    return HttpResponse.successTransactionUpdate();
  }

  async updateBulk(bulk: ItemWithIdDto[]) {
    const uuids = bulk.map((e) => e.dp_id);
    const candidates = await this.itemEntity.find({
      where: { dp_id: In(uuids) },
    });

    if (candidates.length !== bulk.length) {
      HttpExceptions.notFoundBulkItems();
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      for (let i = 0; i < bulk.length; ++i) {
        const uuid = bulk[i].dp_id;

        await queryRunner.manager
          .getRepository(LstItemCharacteristicEntity)
          .delete({ dp_itemId: uuid });

        await queryRunner.manager
          .getRepository(LstItemGaleryEntity)
          .delete({ dp_itemId: uuid });

        await queryRunner.manager.getRepository(ItemEntity).save(bulk[i]);

        bulk[i].dp_itemCharacteristics.forEach((e) => {
          e.dp_itemId = uuid;
        });

        await queryRunner.manager
          .getRepository(LstItemCharacteristicEntity)
          .insert(bulk[i].dp_itemCharacteristics);

        bulk[i].dp_itemGalery.forEach((e) => {
          e.dp_itemId = uuid;
        });

        await queryRunner.manager
          .getRepository(LstItemGaleryEntity)
          .insert(bulk[i].dp_itemGalery);
      }

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
    await this.itemEntity.findOneOrFail({ where: { dp_id: id } });
    this.itemEntity.delete(id);
    return HttpResponse.successDeleted();
  }
}
