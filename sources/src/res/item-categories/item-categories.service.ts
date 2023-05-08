import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';

import ItemCategoryNoIdDto from './dto/item-category-no-id.dto';
import HttpResponse from 'src/utils/HttpResponseDto/HttpResponse';
import ItemCategoryWithIdDto from './dto/item-category-with-id.dto';
import HttpExceptions from 'src/utils/HttpResponseDto/HttpException';
import { ItemCategoryEntity } from './entities/item-category.entity';
import { CreateItemCategoryDto } from './dto/create-item-category.dto';
import { UpdateItemCategoryDto } from './dto/update-item-category.dto';
import { FilterItemCategoryDto } from './dto/filter-item-category.dto';
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

  async create(dto: CreateItemCategoryDto) {
    await this.itemCategoryEntity.save(dto);
    return HttpResponse.successCreate();
  }

  async createBulk(bulk: ItemCategoryNoIdDto[]) {
    await this.itemCategoryEntity.insert(bulk);
    return HttpResponse.successBulkCreate();
  }

  async findAll(filter: FilterItemCategoryDto) {
    if (filter.brand) {
      const candidate = await this.itemBrandEntity.findOne({
        where: { dp_urlSegment: filter.brand },
      });

      if (!candidate) {
        return [];
      }

      filter.dp_itemBrandId = `${candidate.dp_id}`;
    }

    return await this.itemCategoryEntity.find({
      where: {
        dp_itemBrandId: filter.dp_itemBrandId
          ? Number(filter.dp_itemBrandId)
          : undefined,
      },
      order: { dp_sortingIndex: 'ASC' },
    });
  }

  async findOne(id: number) {
    return await this.itemCategoryEntity.findOneOrFail({
      where: { dp_id: id },
    });
  }

  async findOneByUrl(url: string) {
    return await this.itemCategoryEntity.findOneOrFail({
      where: { dp_urlSegment: url },
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
