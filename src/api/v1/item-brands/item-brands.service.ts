import { Response } from 'express';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';

import XmlController from 'src/packages/XmlController';
import CreateItemBrandDto from './dto/create-item-brand.dto';
import ItemBrandWithIdDto from './dto/item-brand-with-id.dto';
import { ItemBrandEntity } from './entities/item-brand.entity';
import { UpdateItemBrandDto } from './dto/update-item-brand.dto';
import HttpResponse from 'src/utils/HttpResponseDto/HttpResponse';
import { FilterItemBrandDto } from './dto/filter-item-category.dto';
import ItemBrandExcludeIdDto from './dto/item-brand-exclude-id.dto';
import HttpExceptions from 'src/utils/HttpResponseDto/HttpException';
import HttpResponseDto from 'src/utils/HttpResponseDto/HttpResponseDto.dto';

@Injectable()
export class ItemBrandsService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(ItemBrandEntity)
    private readonly itemBrandEntity: Repository<ItemBrandEntity>,
  ) {}

  async setShow(id: number, isHidden: string) {
    const candidate = await this.itemBrandEntity.findOneOrFail({
      where: { dp_id: id },
    });

    if (!candidate) {
      throw new HttpException({}, HttpStatus.NOT_FOUND);
    }

    if (isHidden === '1' || isHidden === 'true') {
      await this.itemBrandEntity.update(id, { dp_isHidden: true });
    } else {
      await this.itemBrandEntity.update(id, { dp_isHidden: false });
    }

    return;
  }

  async create(dto: CreateItemBrandDto): Promise<HttpResponseDto> {
    await this.itemBrandEntity.save(dto);
    return HttpResponse.successCreate();
  }

  async createBulk(bulk: ItemBrandExcludeIdDto[]): Promise<HttpResponseDto> {
    await this.itemBrandEntity.insert(bulk);
    return HttpResponse.successBulkCreate();
  }

  async findAll(res: Response, filter: FilterItemBrandDto) {
    const jsObject = await this.itemBrandEntity.find({
      order: {
        dp_sortingIndex: 'ASC',
      },
    });

    if (filter.format === 'xml') {
      res.set('Content-Type', 'application/xml');
      res.send(XmlController.JSObject2XmlString(jsObject));
    } else {
      res.set('Content-Type', 'application/json');
      res.send(jsObject);
    }
  }

  async findOne(id: number): Promise<ItemBrandWithIdDto> {
    return await this.itemBrandEntity.findOneOrFail({ where: { dp_id: id } });
  }

  async findOneByUrl(url: string): Promise<ItemBrandWithIdDto> {
    return await this.itemBrandEntity.findOneOrFail({
      where: { dp_seoUrlSegment: url },
    });
  }

  async update(id: number, dto: UpdateItemBrandDto): Promise<HttpResponseDto> {
    await this.itemBrandEntity.findOneOrFail({ where: { dp_id: id } });
    await this.itemBrandEntity.update(id, dto);
    return HttpResponse.successUpdate();
  }

  async updateBulk(bulk: ItemBrandWithIdDto[]): Promise<HttpResponseDto> {
    const candidates = await this.itemBrandEntity.find({
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
        await this.itemBrandEntity.update(id, bulk[i]);
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
    await this.itemBrandEntity.findOneOrFail({ where: { dp_id: id } });
    await this.itemBrandEntity.delete(id);
    return HttpResponse.successDeleted();
  }
}
