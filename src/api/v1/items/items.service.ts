import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { DataSource, In, Like, Repository } from 'typeorm';

import ItemWithIdDto from './dto/item-with-id.dto';
import { ItemEntity } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { FilterItemDto } from './dto/filter-item.dto';
import getStatusByCode from 'src/utils/getStatusByCode';
import { FindItemIdsDto } from './dto/find-item-ids.dto';
import { FindItemModelsDto } from './dto/find-item-models.dto';
import HttpResponse from 'src/utils/HttpResponseDto/HttpResponse';
import { LstItemGaleryEntity } from './entities/item-galery.entity';
import HttpExceptions from 'src/utils/HttpResponseDto/HttpException';
import HttpResponsePagination from 'src/dto/HttpResponsePagination.dto';
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

  async findAll(query: FilterItemDto, res: Response) {
    const keys = query.fields.split(',');
    const availableFields = this.getAvailableFields();

    const select: Record<string, boolean> = {};
    keys.forEach((key) => {
      if (availableFields.includes(key)) {
        select[key] = true;
      }
    });

    const CURRENT_PAGE = Number(query.page) || 1;
    const LIMIT_ENTITIES = Number(query.limit) || 100;
    const SKIP_ENTITIES = (CURRENT_PAGE - 1) * LIMIT_ENTITIES;

    const [ENTITIES, TOTAL_ENTITIES] = keys.includes('all')
      ? await this.itemEntity.findAndCount({
          skip: SKIP_ENTITIES,
          take: LIMIT_ENTITIES,
          order: { dp_seoUrlSegment: 'ASC' },
        })
      : await this.itemEntity.findAndCount({
          select,
          skip: SKIP_ENTITIES,
          take: LIMIT_ENTITIES,
          order: { dp_seoUrlSegment: 'ASC' },
        });

    const LAST_PAGE = Math.ceil(TOTAL_ENTITIES / LIMIT_ENTITIES);

    const CODE = HttpStatus.OK;
    const HTTP_RESPONSE: HttpResponsePagination = {
      code: CODE,
      status: getStatusByCode(CODE),
      message: 'Получили несколько сущностей',
      pagination: {
        current_page: CURRENT_PAGE,
        last_page: LAST_PAGE,
        total_entities: TOTAL_ENTITIES,
        limit_entities: LIMIT_ENTITIES,
        skip_entities: SKIP_ENTITIES,
      },
      response: ENTITIES,
    };

    res.status(CODE).send(HTTP_RESPONSE);
  }

  private getAvailableFields(): string[] {
    return [
      'dp_id',
      'dp_1cCode',
      'dp_1cDescription',
      'dp_1cIsFolder',
      'dp_1cParentId',
      'dp_barcodes',
      'dp_brand',
      'dp_combinedName',
      'dp_cost',
      'dp_currancy',
      'dp_height',
      'dp_isHidden',
      'dp_itemCategoryId',
      'dp_length',
      'dp_photos',
      'dp_photos360',
      'dp_photoUrl',
      'dp_seoDescription',
      'dp_seoKeywords',
      'dp_seoTitle',
      'dp_seoUrlSegment',
      'dp_sortingIndex',
      'dp_textCharacteristics',
      'dp_vendorIds',
      'dp_weight',
      'dp_wholesaleQuantity',
      'dp_width',
      'dp_youtubeIds',
    ];
  }

  async findOneByModel(model: string) {
    await this.itemEntity.findOneOrFail({ where: { dp_seoUrlSegment: model } });
    return await this.itemEntity.findOne({
      where: { dp_seoUrlSegment: model },
      relations: ['dp_itemCharacteristics', 'dp_itemGalery'],
    });
  }

  async findModels(dto: FindItemModelsDto, res: Response) {
    const status = HttpStatus.OK;
    const json = await this.itemEntity.find({
      where: { dp_seoUrlSegment: In(dto.models) },
      relations: ['dp_itemCharacteristics', 'dp_itemGalery'],
      order: { dp_seoUrlSegment: 'DESC' },
    });
    res.status(status).send(json);
  }

  async findIds(dto: FindItemIdsDto, res: Response) {
    const status = HttpStatus.OK;
    const json = await this.itemEntity.find({
      where: { dp_id: In(dto.ids) },
      relations: ['dp_itemCharacteristics', 'dp_itemGalery'],
      order: { dp_seoUrlSegment: 'DESC' },
    });
    res.status(status).send(json);
  }

  async getImageByModel(res: Response, model: string) {
    const candidate = await this.itemEntity.findOne({
      where: { dp_seoUrlSegment: model },
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
        { dp_seoUrlSegment: Like(`%${search}%`) },
        { dp_seoTitle: Like(`%${search}%`) },
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
        { dp_seoUrlSegment: Like(`%${search}%`) },
        { dp_seoTitle: Like(`%${search}%`) },
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
