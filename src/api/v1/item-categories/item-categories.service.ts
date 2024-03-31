import { Response } from 'express';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';

import HttpResponse from 'src/utils/HttpResponseDto/HttpResponse';
import ItemCategoryWithIdDto from './dto/item-category-with-id.dto';
import HttpExceptions from 'src/utils/HttpResponseDto/HttpException';
import { ItemCategoryEntity } from './entities/item-category.entity';
import { CreateItemCategoryDto } from './dto/create-item-category.dto';
import { UpdateItemCategoryDto } from './dto/update-item-category.dto';
import { FilterItemCategoryDto } from './dto/filter-item-category.dto';
import ItemCategoryExcludeIdDto from './dto/item-category-exclude-id.dto';
import { ItemBrandEntity } from '../item-brands/entities/item-brand.entity';

@Injectable()
export class ItemCategoriesService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(ItemCategoryEntity)
    private readonly itemCategoryEntity: Repository<ItemCategoryEntity>,
    @InjectRepository(ItemBrandEntity)
    private readonly itemBrandEntity: Repository<ItemBrandEntity>,
  ) {}

  async setShow(id: number, isHidden: string) {
    const candidate = await this.itemCategoryEntity.findOneOrFail({
      where: { dp_id: id },
    });

    if (!candidate) {
      throw new HttpException({}, HttpStatus.NOT_FOUND);
    }

    if (isHidden === '1' || isHidden === 'true') {
      await this.itemCategoryEntity.update(id, { dp_isHidden: true });
    } else {
      await this.itemCategoryEntity.update(id, { dp_isHidden: false });
    }

    return;
  }

  async create(dto: CreateItemCategoryDto) {
    await this.itemCategoryEntity.save(dto);
    return HttpResponse.successCreate();
  }

  async createBulk(bulk: ItemCategoryExcludeIdDto[]) {
    await this.itemCategoryEntity.insert(bulk);
    return HttpResponse.successBulkCreate();
  }

  async findAll(res: Response, filter: FilterItemCategoryDto) {
    if (filter.brand) {
      const candidate = await this.itemBrandEntity.findOne({
        where: { dp_seoUrlSegment: filter.brand },
      });

      if (!candidate) {
          return res.status(HttpStatus.OK).send([]);
      }

      filter.dp_itemBrandId = `${candidate.dp_id}`;
    }

    const jsObject = await this.itemCategoryEntity.find({
      where: {
        dp_itemBrandId: filter.dp_itemBrandId
          ? Number(filter.dp_itemBrandId)
          : undefined,
      },
    });

      return res.status(HttpStatus.OK).send(jsObject);
  }

  async findOne(id: number) {
    return await this.itemCategoryEntity.findOneOrFail({
      where: { dp_id: id },
    });
  }

  async findOneByUrl(url: string) {
    return await this.itemCategoryEntity.findOneOrFail({
      where: { dp_seoUrlSegment: url },
    });
  }

  async update(id: number, dto: UpdateItemCategoryDto) {
    await this.itemCategoryEntity.findOneOrFail({ where: { dp_id: id } });
    await this.itemCategoryEntity.update(id, dto);
    return HttpResponse.successUpdate();
  }

  async updateBulk(bulk: ItemCategoryWithIdDto[]) {
    const candidates = await this.itemCategoryEntity.find({
      where: {
        dp_id: In(bulk.map((e) => e.dp_id)),
      },
    });

    if (bulk.length !== candidates.length) {
      HttpExceptions.notFoundBulkItems();
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      for (let i = 0; i < bulk.length; ++i) {
        const id = bulk[i].dp_id;
        delete bulk[i].dp_id;
        await this.itemCategoryEntity.update(id, bulk[i]);
      }
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      HttpExceptions.exceptionTransaction(err);
    } finally {
      await queryRunner.release();
    }

    return HttpResponse.successBulkUpdate();
  }

  async remove(id: number) {
    await this.itemCategoryEntity.findOneOrFail({ where: { dp_id: id } });
    await this.itemCategoryEntity.delete(id);
    return HttpResponse.successDeleted();
  }
}
