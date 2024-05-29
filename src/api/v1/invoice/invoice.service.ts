import { Response } from 'express';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  getConflictResponse,
  getNotFoundResponse,
  getOkResponse,
} from 'src/utils/getResponse/getResponse';
import { BodyCreateTtnDto } from './dto/ttn.dto';
import { TtnEntity } from './entities/DP_DOC_TTN.entity';
import { ItemEntity } from '../items/entities/item.entity';
import { BodyCreateInventoryDto } from './dto/inventory.dto';
import { LstTtnItemsEntity } from './entities/DP_LST_TtnItems.entity';
import { InventoryItemsEntity } from './entities/DP_LST_InventoryItems.entity';

@Injectable()
export class InvoiceService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(ItemEntity)
    private readonly itemEntity: Repository<ItemEntity>,
    @InjectRepository(TtnEntity)
    private readonly ttnEntity: Repository<TtnEntity>,
    @InjectRepository(InventoryItemsEntity)
    private readonly inventoryItemsEntity: Repository<InventoryItemsEntity>,
  ) {}

  async getInventory(res: Response) {
    const array = await this.inventoryItemsEntity.find();
    const json = getOkResponse({
      message: 'Получили список остатков',
      data: array
    });
    return res.status(json.statusCode).send(json);
  }

  async createBulkInventory(
    res: Response,
    dto: BodyCreateInventoryDto,
    warehouseId: number,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.getRepository(InventoryItemsEntity).delete({
        dp_warehouseId: warehouseId,
      });

      await queryRunner.manager.getRepository(InventoryItemsEntity).insert(
        dto.bulk.map((e) => {
          return {
            dp_warehouseId: warehouseId,
            dp_count: e.dp_count,
            dp_note: e.dp_note,
            dp_vendorId: e.dp_vendorId,
          };
        }),
      );

      await queryRunner.commitTransaction();

      const json = getOkResponse({ message: 'Вы обновили остатки на складе' });
      return res.status(json.statusCode).send(json);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      const json = getConflictResponse({
        message: `Транзакция не выполнена: ${err}`,
        data: {
          exception: `${err}`,
        },
      });
      return res.status(json.statusCode).send(json);
    }
  }

  async createTtn(res: Response, dto: BodyCreateTtnDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const ttn = await queryRunner.manager.getRepository(TtnEntity).save(dto);

      await queryRunner.manager.getRepository(LstTtnItemsEntity).insert(
        dto.dp_lstTtnItems.map((e) => {
          return {
            ...e,
            dp_ttnId: ttn.dp_id,
          };
        }),
      );

      await queryRunner.commitTransaction();

      const json = getOkResponse({
        message: `Вы состали ТТН на складе ${dto.dp_warehouseId}`,
      });
      return res.status(json.statusCode).send(json);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      const json = getConflictResponse({
        message: `Транзакция не выполнена: ${err}`,
        data: {
          exception: `${err}`,
        },
      });
      return res.status(json.statusCode).send(json);
    }
  }

  async getTTN(res: Response) {
    const array = await this.ttnEntity.find();

    const json = getOkResponse({
      message: 'Получили список ТТН без списка товаров',
      data: array,
    });
    return res.status(json.statusCode).send(json);
  }

  async getTTNbyId(res: Response, ttnId: string) {
    const candidate = await this.ttnEntity.findOne({
      where: {
        dp_id: ttnId,
      },
      relations: ['dp_lstTtnItems'],
    });

    if (!candidate) {
      const json = getNotFoundResponse({
        message: `Не найдена ТТН по id = ${ttnId}`,
      });
      return res.status(json.statusCode).send(json);
    }

    const json = getOkResponse({
      message: 'Получили ТТН со списком товаров',
      data: candidate,
    });
    return res.status(json.statusCode).send(json);
  }

  async deleteTTNbyId(res: Response, ttnId: string) {
    const candidate = await this.ttnEntity.findOne({ where: { dp_id: ttnId } });

    if (!candidate) {
      const json = getNotFoundResponse({
        message: `Не найдена ТТН по id = ${ttnId}`,
      });
      return res.status(json.statusCode).send(json);
    }

    await this.ttnEntity.delete(ttnId);

    const json = getOkResponse({
      message: `Вы удалили ТТН по id = ${ttnId}`,
    });
    return res.status(json.statusCode).send(json);
  }
}
