import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInvoicePlusDto } from './dto/invoice-plus.dto';
import { CreateInvoiceMinusDto } from './dto/invoice-minus.dto';
import { InvoicePlusEntity } from './entities/invoice-plus.entity';
import { InvoiceMinusEntity } from './entities/invoice-minus.entity';
import { LstInvoicePlusItemsEntity } from './entities/lst-invoice-plus-items.entity';
import { LstInvoiceMinusItemsEntity } from './entities/lst-invoice-minus-items.entity';

@Injectable()
export class InvoiceService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(InvoicePlusEntity)
    private readonly invoicePlusEntity: Repository<InvoicePlusEntity>,
    @InjectRepository(InvoiceMinusEntity)
    private readonly invoiceMinusEntity: Repository<InvoiceMinusEntity>,
  ) {}

  async createPlus(dto: CreateInvoicePlusDto) {
    const bulk = dto.bulk;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      let d = new Date(dto.date);
      if (d.toString() === 'Invalid Date') {
        d = new Date();
      }
      const savedInvoice = await queryRunner.manager
        .getRepository(InvoicePlusEntity)
        .save({
          dp_date: d.toJSON(),
        });

      const uuid = savedInvoice.dp_id;
      const lst = bulk.map((e) => {
        return { ...e, dp_invoicePlusId: uuid };
      });

      await queryRunner.manager
        .getRepository(LstInvoicePlusItemsEntity)
        .insert(lst);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        'Транзакция не выполнена ' + err,
        HttpStatus.CONFLICT,
      );
    } finally {
      await queryRunner.release();
    }

    return 'OK';
  }

  async createMinus(dto: CreateInvoiceMinusDto) {
    const bulk = dto.bulk;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      let d = new Date(dto.date);
      if (d.toString() === 'Invalid Date') {
        d = new Date();
      }
      const savedInvoice = await queryRunner.manager
        .getRepository(InvoiceMinusEntity)
        .save({
          dp_date: d.toJSON(),
        });

      const uuid = savedInvoice.dp_id;
      const lst = bulk.map((e) => {
        return { ...e, dp_invoiceMinusId: uuid };
      });

      await queryRunner.manager
        .getRepository(LstInvoiceMinusItemsEntity)
        .insert(lst);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        'Транзакция не выполнена ' + err,
        HttpStatus.CONFLICT,
      );
    } finally {
      await queryRunner.release();
    }

    return 'OK';
  }

  async findAllPlus() {
    return await this.invoicePlusEntity.find({
      // relations: ['dp_invoicePlusItems'],
    });
  }

  async findAllMinus() {
    return await this.invoiceMinusEntity.find({
      // relations: ['dp_invoiceMinusItems'],
    });
  }

  async getStock() {
    const resultPlus = await this.dataSource
      .getRepository(LstInvoicePlusItemsEntity)
      .createQueryBuilder('dp')
      .select('dp.dp_vendorId', 'Артикул')
      .addSelect('SUM(dp.dp_count)', 'Количество')
      .groupBy('dp.dp_vendorId')
      .getRawMany();
    const resultMinus = await this.dataSource
      .getRepository(LstInvoiceMinusItemsEntity)
      .createQueryBuilder('dp')
      .select('dp.dp_vendorId', 'Артикул')
      .addSelect('SUM(dp.dp_count)', 'Количество')
      .groupBy('dp.dp_vendorId')
      .getRawMany();
    const vendorIdsSet = new Set<string>();

    resultPlus.forEach((e) => {
      vendorIdsSet.add(e.Артикул);
    });

    resultMinus.forEach((e) => {
      vendorIdsSet.add(e.Артикул);
    });

    const vendorIdArray = Array.from(vendorIdsSet);
    let dict: Record<string, number> = {};
    vendorIdArray.forEach((e) => {
      dict[e] = 0;
    });

    resultPlus.forEach((e) => {
      dict[e.Артикул] += Number(e.Количество);
    });

    resultMinus.forEach((e) => {
      dict[e.Артикул] -= Number(e.Количество);
    });
    return dict;
  }

  async findOnePlus(id: string) {
    return await this.invoicePlusEntity.findOneOrFail({
      where: {
        dp_id: id,
      },
      relations: ['dp_invoicePlusItems'],
    });
  }

  async findOneMinus(id: string) {
    return await this.invoiceMinusEntity.findOneOrFail({
      where: {
        dp_id: id,
      },
      relations: ['dp_invoiceMinusItems'],
    });
  }

  async removePlus(id: string) {
    await this.invoicePlusEntity.findOneOrFail({ where: { dp_id: id } });
    await this.invoicePlusEntity.delete({ dp_id: id });
  }

  async removeMinus(id: string) {
    await this.invoiceMinusEntity.findOneOrFail({ where: { dp_id: id } });
    await this.invoiceMinusEntity.delete({ dp_id: id });
  }
}
