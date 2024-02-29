import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { DataSource, In, Like, Repository } from 'typeorm';

import ItemWithIdDto from './dto/item-with-id.dto';
import { ItemEntity } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { FilterItemDto } from './dto/filter-item.dto';
import XmlController from 'src/packages/XmlController';
import { FindItemIdsDto } from './dto/find-item-ids.dto';
import { FindItemModelsDto } from './dto/find-item-models.dto';
import HttpResponse from 'src/utils/HttpResponseDto/HttpResponse';
import { LstItemGaleryEntity } from './entities/item-galery.entity';
import HttpExceptions from 'src/utils/HttpResponseDto/HttpException';
import { ItemBrandEntity } from '../item-brands/entities/item-brand.entity';
import { LstItemCharacteristicEntity } from './entities/item-characteristics.entity';
import { ItemCategoryEntity } from '../item-categories/entities/item-category.entity';

@Injectable()
export class ItemsService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(ItemEntity)
    private readonly itemEntity: Repository<ItemEntity>,
    @InjectRepository(ItemBrandEntity)
    private readonly itemBrandEntity: Repository<ItemBrandEntity>,
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

  async findAll(filter: FilterItemDto, res: Response) {
    if (filter.category) {
      const candidate = await this.itemCategoryEntity.findOne({
        where: { dp_urlSegment: filter.category },
      });

      if (!candidate) {
        if (filter.format === 'xml') {
          res.set('Content-Type', 'application/xml');
          res.send(XmlController.JSObject2XmlString([]));
        } else {
          res.set('Content-Type', 'application/json');
          res.send([]);
        }
      }

      filter.dp_itemCategoryId = `${candidate.dp_id}`;
    }

    const categoriesId: number[] = [];
    if (filter.brand) {
      const brand = await this.itemBrandEntity.findOne({
        where: {
          dp_urlSegment: filter.brand,
        },
      });
      const brandId = brand.dp_id;

      const categories = await this.itemCategoryEntity.find({
        where: {
          dp_itemBrandId: brandId,
        },
      });

      for (let i = 0; i < categories.length; ++i) {
        categoriesId.push(categories[i].dp_id);
      }
    }

    if (filter.dp_itemCategoryId) {
      categoriesId.push(Number(filter.dp_itemCategoryId));
    }

    const jsObject = await this.itemEntity.find({
      where: {
        dp_model: filter.dp_model,
        dp_itemCategoryId: categoriesId.length ? In(categoriesId) : undefined,
      },
      relations: ['dp_itemCharacteristics', 'dp_itemGalery'],
      order: { dp_model: 'ASC', dp_itemCategoryId: 'ASC' },
    });

    if (filter.format === 'xml') {
      res.set('Content-Type', 'application/xml');
      res.send(XmlController.JSObject2XmlString(jsObject));
    } else {
      res.set('Content-Type', 'application/json');
      res.send(jsObject);
    }
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

  async getImageByModel(res: Response, model: string) {
    const candidate = await this.itemEntity.findOne({
      where: { dp_model: model },
      select: {
        dp_photoUrl: true,
      },
    });

    if (!candidate) {
      throw new HttpException({}, HttpStatus.NOT_FOUND);
    }

    const image_url = candidate.dp_photoUrl;

    if (image_url.length === 0) {
      throw new HttpException({}, HttpStatus.NOT_FOUND);
    }

    // res.status(302).setHeader('Location', candidate.dp_photoUrl).send();
    res.redirect(image_url);
  }

  async setShow(id: string, isHidden: string) {
    const candidate = await this.itemEntity.findOneOrFail({
      where: { dp_id: id },
    });

    if (!candidate) {
      throw new HttpException({}, HttpStatus.NOT_FOUND);
    }

    if (isHidden === '1' || isHidden === 'true') {
      await this.itemEntity.update(id, { dp_isHidden: true });
    } else {
      await this.itemEntity.update(id, { dp_isHidden: false });
    }

    return;
  }

  async search(search: string, res: Response) {
    const status = HttpStatus.OK;
    const json = await this.itemEntity.find({
      where: [
        { dp_model: Like(`%${search}%`) },
        { dp_name: Like(`%${search}%`) },
        { dp_seoKeywords: Like(`%${search}%`) },
        {
          dp_itemCharacteristics: {
            dp_value: Like(`%${search}%`),
          },
        },
      ],
      take: 10,
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
