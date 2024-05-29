import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Like, Repository } from 'typeorm';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';

import GetItemDto from './dto/get-item.dto';
import ItemWithIdDto from './dto/item-with-id.dto';
import { ItemEntity } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { FilterItemDto } from './dto/filter-item.dto';
import { FindItemIdsDto } from './dto/find-item-ids.dto';
import { FindItemModelsDto } from './dto/find-item-models.dto';
import FindAllByVendorsDto from './dto/find-all-by-vendors.dto';
import FindAllPaginationDto from './dto/find-all-pagination.dto';
import PaginationDto from 'src/types/ApiResponse/Pagination.dto';
import HttpResponse from 'src/utils/HttpResponseDto/HttpResponse';
import CreateItemFolderBodyDto from './dto/create-folder-query.dto';
import { LstItemGaleryEntity } from './entities/item-galery.entity';
import HttpExceptions from 'src/utils/HttpResponseDto/HttpException';
import { ItemBrandEntity } from '../item-brands/entities/item-brand.entity';
import FindAllPaginationResponseDto from './dto/find-all-pagination-response.dto';
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

  async createFolder(body: CreateItemFolderBodyDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const models = body.dp_urlSegments.split('\n');
      const model = body.dp_urlSegment;
      const title = body.dp_seoTitle || model;

      const folderCandidate = await queryRunner.manager
        .getRepository(ItemEntity)
        .save({
          dp_1cParentId: body.dp_1cParentId,
          dp_seoTitle: title,
          dp_seoDescription: title,
          dp_seoKeywords: title,
          dp_seoUrlSegment: model,
          dp_1cDescription: '',
          dp_itemCategoryId: 1,
          dp_1cCode: '',
          dp_1cIsFolder: true,
          dp_barcodes: '',
          dp_brand: '',
          dp_combinedName: '',
          dp_cost: 0,
          dp_currancy: '',
          dp_height: 0,
          dp_isHidden: false,
          dp_length: 0,
          dp_ozonIds: '',
          dp_photos: '',
          dp_photos360: '',
          dp_photoUrl: '',
          dp_sortingIndex: 0,
          dp_textCharacteristics: '',
          dp_vendorIds: '',
          dp_weight: 0,
          dp_wholesaleQuantity: 0,
          dp_width: 0,
          dp_youtubeIds: '',
          dp_markdown: '',
        });

      const parentId = folderCandidate.dp_id;

      const childrenCandidates = await queryRunner.manager
        .getRepository(ItemEntity)
        .find({
          where: {
            dp_seoUrlSegment: In(models),
          },
        });

      for (let i = 0; i < childrenCandidates.length; ++i) {
        const current = childrenCandidates[i];
        await queryRunner.manager
          .getRepository(ItemEntity)
          .update(current.dp_id, { ...current, dp_1cParentId: parentId });
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

  async updateFolder(body: CreateItemFolderBodyDto) {
    const candidate = await this.itemEntity.findOneOrFail({
      where: {
        dp_seoUrlSegment: body.dp_urlSegment,
      },
    });

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const models = body.dp_urlSegments.split('\n');
      const model = body.dp_urlSegment;
      const title = body.dp_seoTitle || model;
      const id = candidate.dp_id;

      await queryRunner.manager.getRepository(ItemEntity).update(id, {
        dp_1cParentId: body.dp_1cParentId,
        dp_seoTitle: title,
        dp_seoUrlSegment: model,
        dp_1cIsFolder: true,
      });

      const parentId = id;

      const childrenCandidates = await queryRunner.manager
        .getRepository(ItemEntity)
        .find({
          where: {
            dp_seoUrlSegment: In(models),
          },
        });

      for (let i = 0; i < childrenCandidates.length; ++i) {
        const current = childrenCandidates[i];
        await queryRunner.manager
          .getRepository(ItemEntity)
          .update(current.dp_id, { ...current, dp_1cParentId: parentId });
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

  async createBulk(bulk: CreateItemDto[]) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      for (let i = 0; i < bulk.length; ++i) {
        const savedItem = await queryRunner.manager
          .getRepository(ItemEntity)
          .save({
            dp_1cCode: bulk[i].dp_1cCode,
            dp_1cDescription: bulk[i].dp_1cDescription,
            dp_1cIsFolder: bulk[i].dp_1cIsFolder,
            dp_1cParentId: bulk[i].dp_1cParentId,
            dp_barcodes: bulk[i].dp_barcodes,
            dp_brand: bulk[i].dp_brand,
            dp_combinedName: bulk[i].dp_combinedName,
            dp_cost: bulk[i].dp_cost,
            dp_currancy: bulk[i].dp_currancy,
            dp_height: bulk[i].dp_height,
            dp_isHidden: bulk[i].dp_isHidden,
            dp_itemCategoryId: bulk[i].dp_itemCategoryId,
            dp_itemCharacteristics: bulk[i].dp_itemCharacteristics,
            dp_length: bulk[i].dp_length,
            dp_ozonIds: bulk[i].dp_ozonIds,
            dp_photos: bulk[i].dp_photos,
            dp_photos360: bulk[i].dp_photos360,
            dp_photoUrl: bulk[i].dp_photoUrl,
            dp_seoDescription: bulk[i].dp_seoDescription,
            dp_seoKeywords: bulk[i].dp_seoKeywords,
            dp_seoTitle: bulk[i].dp_seoTitle,
            dp_seoUrlSegment: bulk[i].dp_seoUrlSegment,
            dp_sortingIndex: bulk[i].dp_sortingIndex,
            dp_textCharacteristics: bulk[i].dp_textCharacteristics,
            dp_vendorIds: bulk[i].dp_vendorIds,
            dp_weight: bulk[i].dp_weight,
            dp_wholesaleQuantity: bulk[i].dp_wholesaleQuantity,
            dp_width: bulk[i].dp_weight,
            dp_youtubeIds: bulk[i].dp_youtubeIds,
            dp_markdown: bulk[i].dp_markdown,
          });

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
        where: { dp_seoUrlSegment: filter.category },
      });

      if (!candidate) {
        res.status(HttpStatus.OK).send([]);
        return;
      }

      filter.dp_itemCategoryId = `${candidate.dp_id}`;
    }

    const categoriesId: number[] = [];
    if (filter.brand) {
      const brand = await this.itemBrandEntity.findOne({
        where: {
          dp_seoUrlSegment: filter.brand,
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
        dp_1cParentId: filter.dp_1cParentId,
        dp_1cIsFolder:
          Number(filter.dp_1cIsFolder) === 1
            ? true
            : Number(filter.dp_1cIsFolder) === 0
            ? false
            : undefined,
        dp_seoTitle: filter.dp_seoTitle
          ? Like(`%${filter.dp_seoTitle}%`)
          : undefined,
        dp_seoUrlSegment: filter.dp_seoUrlSegment || filter.dp_model,
        dp_itemCategoryId: categoriesId.length ? In(categoriesId) : undefined,
      },
      relations: ['dp_itemCharacteristics', 'dp_itemGalery'],
      order: { dp_seoUrlSegment: 'ASC', dp_itemCategoryId: 'ASC' },
    });

    res.status(HttpStatus.OK).send(jsObject);
  }

  async findAllPagination(query: FindAllPaginationDto, res: Response) {
    const PAGE = Number(query.page) || 1;
    const LIMIT = Number(query.limit) || 20;
    const SKIP = LIMIT * (PAGE - 1);

    const [ITEMS, TOTAL] = await this.itemEntity.findAndCount({
      skip: SKIP,
      take: LIMIT,
      where: {
        dp_1cParentId: query.dp_1cParentId,
      },
      order: {
        dp_seoUrlSegment: 'ASC',
      },
    });

    const LAST_PAGE = Math.ceil(TOTAL / LIMIT);

    const pagination: PaginationDto = {
      current_page: PAGE,
      last_page: LAST_PAGE,
      limit_items: TOTAL,
      skip_items: SKIP,
      total_items: TOTAL,
    };

    const ApiResponse: FindAllPaginationResponseDto = {
      code: 200,
      status: '200 OK',
      message: '',
      pagination,
      data: ITEMS,
    };

    return res.status(ApiResponse.code).send(ApiResponse);
  }

  async findOneByModel(model: string) {
    await this.itemEntity.findOneOrFail({ where: { dp_seoUrlSegment: model } });
    return await this.itemEntity.findOne({
      where: { dp_seoUrlSegment: model },
      relations: ['dp_itemCharacteristics', 'dp_itemGalery'],
    });
  }

  async findOneByVendor(vendorId: string) {
    const candidate = await this.itemEntity.query(`
      SELECT *
      FROM DP_CTL_Items
      WHERE FIND_IN_SET("${vendorId}", REPLACE(dp_vendorIds, "\\n", ",")) > 0
      LIMIT 1
    `);
    return candidate;
  }

  async findByVendors(body: FindAllByVendorsDto, res: Response) {
    const vendors = body.vendors;
    const likes = vendors.map((e) => {
      return `A.vendors LIKE '%\n${e}\n%'`;
    });
    const candidate = await this.itemEntity.query(`
      SELECT * 
      FROM (
          SELECT *, CONCAT(CONCAT("\n", dp_vendorIds), "\n") AS "vendors" 
          FROM DP_CTL_Items
      ) AS A 
      WHERE
      ${likes.join(' OR ')}
      ;
    `);
    return res.status(200).send(candidate);
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

  async findBreadCrumbs(model: string, res: Response) {
    const arr: GetItemDto[] = [];
    const status = HttpStatus.OK;

    const FisrtCandidate = await this.itemEntity.findOneOrFail({
      select: {
        dp_id: true,
        dp_1cParentId: true,
        dp_seoUrlSegment: true,
      },
      where: {
        dp_seoUrlSegment: model,
      },
    });

    arr.push(FisrtCandidate);

    let parentId = FisrtCandidate.dp_1cParentId;
    for (let i = 0; i < 10; ++i) {
      const candidate = await this.itemEntity.findOne({
        select: {
          dp_id: true,
          dp_1cParentId: true,
          dp_seoUrlSegment: true,
        },
        where: {
          dp_id: parentId,
        },
      });

      if (!candidate) {
        break;
      }

      arr.push(candidate);
      parentId = candidate.dp_1cParentId;

      if (candidate.dp_1cParentId === '') {
        break;
      }
    }

    res.status(status).send(arr.reverse());
  }

  async getImageByModel(res: Response, model: string) {
    const candidate = await this.itemEntity.query(`
      SELECT * 
      FROM (
          SELECT *, CONCAT(CONCAT("\n", dp_vendorIds), "\n") AS "vendors" 
          FROM DP_CTL_Items
      ) AS A 
      WHERE A.vendors LIKE '%\n${model}\n%'
      LIMIT 1
      ;
    `);

    if (!candidate) {
      throw new HttpException({}, HttpStatus.NOT_FOUND);
    }

    // return res.status(200).send(candidate);

    const firstCandidate = candidate[0];
    const images = firstCandidate.dp_photos
      .split('\n')
      .filter((e) => e.length > 0);
    const mainPhoto = images[0] || '';

    if (mainPhoto.length === 0) {
      throw new HttpException({}, HttpStatus.NOT_FOUND);
    }

    // res.status(302).setHeader('Location', candidate.dp_photoUrl).send();
    res.redirect(mainPhoto);
  }

  async getImageById(res: Response, id: string) {
    const candidate = await this.itemEntity.findOne({
      where: {
        dp_id: id
      }
    })

    if (!candidate) {
      throw new HttpException({}, HttpStatus.NOT_FOUND);
    }

    // return res.status(200).send(candidate);

    const images = candidate.dp_photos
      .split('\n')
      .filter((e) => e.length > 0);
    const mainPhoto = images[0] || '';

    if (mainPhoto.length === 0) {
      throw new HttpException({}, HttpStatus.NOT_FOUND);
    }

    // res.status(302).setHeader('Location', candidate.dp_photoUrl).send();
    res.redirect(mainPhoto);
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

        if (bulk[i].dp_itemCharacteristics) {
          bulk[i].dp_itemCharacteristics.forEach((e) => {
            e.dp_itemId = uuid;
          });

          await queryRunner.manager
            .getRepository(LstItemCharacteristicEntity)
            .insert(bulk[i].dp_itemCharacteristics);
        }

        if (bulk[i].dp_itemGalery) {
          bulk[i].dp_itemGalery.forEach((e) => {
            e.dp_itemId = uuid;
          });

          await queryRunner.manager
            .getRepository(LstItemGaleryEntity)
            .insert(bulk[i].dp_itemGalery);
        }
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
