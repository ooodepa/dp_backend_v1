import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';

import HttpResponse from 'src/utils/HttpResponseDto/HttpResponse';
import HttpExceptions from 'src/utils/HttpResponseDto/HttpException';
import ItemCharacteristicNoIdDto from './dto/item-characteristic-no-id.dto';
import ItemCharacteristicWithIdDto from './dto/item-characteristic-with-id.dto';
import { ItemCharacteristicEntity } from './entities/item-characteristic.entity';
import { CreateItemCharacteristicDto } from './dto/create-item-characteristic.dto';
import { UpdateItemCharacteristicDto } from './dto/update-item-characteristic.dto';

@Injectable()
export class ItemCharacteristicsService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(ItemCharacteristicEntity)
    private readonly itemCharacteristicEntity: Repository<ItemCharacteristicEntity>,
  ) {}

  async create(dto: CreateItemCharacteristicDto) {
    await this.itemCharacteristicEntity.save(dto);
    return HttpResponse.successCreate();
  }

  async createBulk(bulk: ItemCharacteristicNoIdDto[]) {
    await this.itemCharacteristicEntity.insert(bulk);
    return HttpResponse.successBulkCreate();
  }

  async findAll() {
    return await this.itemCharacteristicEntity.find({
      order: { dp_name: 'ASC' },
    });
  }

  async findOne(id: number) {
    return await this.itemCharacteristicEntity.findOneOrFail({
      where: { dp_id: id },
    });
  }

  async update(id: number, dto: UpdateItemCharacteristicDto) {
    await this.itemCharacteristicEntity.findOneOrFail({
      where: { dp_id: id },
    });
    await this.itemCharacteristicEntity.update(id, dto);
    return HttpResponse.successUpdate();
  }

  async updateBulk(bulk: ItemCharacteristicWithIdDto[]) {
    const candidates = await this.itemCharacteristicEntity.find({
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
        await this.itemCharacteristicEntity.update(id, bulk[i]);
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
    await this.itemCharacteristicEntity.findOneOrFail({
      where: { dp_id: id },
    });
    await this.itemCharacteristicEntity.delete(id);
    return HttpResponse.successDeleted();
  }
}
