import * as ExcelJS from 'exceljs';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import { convert as numberToWordsRu } from 'number-to-words-ru';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';

import { OrderEntity } from './entities/order.entity';
import { UsersService } from '../users/users.service';
import { CreateOrderDto } from './dto/create-order.dto';
import DateController from 'src/package/DateController';
import EmailOrderItemDto from './dto/email-order-item.dto';
import { ItemEntity } from '../items/entities/item.entity';
import { UserEntity } from '../users/entities/user.entity';
import { OrderItemsEntity } from './entities/order-items.entity';
import HttpResponse from 'src/utils/HttpResponseDto/HttpResponse';
import HttpExceptions from 'src/utils/HttpResponseDto/HttpException';

@Injectable()
export class OrdersService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly userService: UsersService,
    private readonly mailerService: MailerService,
    @InjectRepository(ItemEntity)
    private readonly itemEntity: Repository<ItemEntity>,
    @InjectRepository(OrderEntity)
    private readonly orderEntity: Repository<OrderEntity>,
    @InjectRepository(OrderItemsEntity)
    private readonly orderItemsEntity: Repository<OrderItemsEntity>,
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
  ) {}
  async create(createOrderDto: CreateOrderDto, req: Request) {
    const payload = await this.userService.getAccessTokenFromRequest(req);

    const items = await this.itemEntity.find({
      where: {
        dp_id: In(createOrderDto.dp_orderItems.map((e) => e.dp_itemId)),
      },
    });

    const user = await this.userEntity.findOneOrFail({
      where: { dp_id: payload.id },
    });

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const order = await queryRunner.manager
        .getRepository(OrderEntity)
        .save({ dp_userId: payload.id });

      const uuid = order.dp_id;

      const d = new Date(order.dp_date);
      const stringDate = DateController.getDate__DD_MMMMMM_YYYY(d);
      const array = [
        [`${process.env.APP__MY_ORGANIZATION}`],
        [
          `Р/сч: ${process.env.APP__MY_CHECKING_ACCOUNT} в ${process.env.APP__MY_BANK} код ${process.env.APP__MY_BIK}, УНП: ${process.env.APP__MY_UNP}`,
        ],
        [`Адрес: ${process.env.APP__MY_ADDRESS}`],
        [],
        [],
        [`Счет №${order.dp_number} от ${stringDate}`],
        [],
        [],
        [`Закачик: ${user.dp_shortNameLegalEntity}`],
        [
          `Плательщик ${user.dp_shortNameLegalEntity}, адрес: ${user.dp_address}`,
        ],
        [
          `Р/сч: <Ваш_расчётный_счёт> в <Ваш_банк> код <Ваш_БИК>, УНП: ${user.dp_unp}`,
        ],
        [],
        [
          '№',
          'Товары (работы, услуги)',
          'Единица измерения',
          'Количество',
          'Цена, руб. коп.',
          'Сумма, руб. коп.',
          'Ставка НДС, %',
          'Сумма НДС, руб. коп.',
          'Всего с НДС, руб. коп.',
        ],
      ];

      let length = 0;
      let countSum = 0;
      let countSumNds = 0;
      let countSumTotal = 0;
      const orderItemsArray: OrderItemsEntity[] = [];
      const emailOrderItems: EmailOrderItemDto[] = [];
      for (let i = 0; i < createOrderDto.dp_orderItems.length; ++i) {
        const orderItem = createOrderDto.dp_orderItems[i];
        for (let j = 0; j < items.length; ++j) {
          const item = items[j];
          if (item.dp_id === orderItem.dp_itemId) {
            const count = orderItem.dp_count;
            const cost = item.dp_cost;
            const costStr = Number(cost).toFixed(2);

            const sum = count * cost;
            const sumStr = Number(sum).toFixed(2);

            const sumNds = sum * 0.2;
            const sumNdsStr = Number(sumNds).toFixed(2);

            const totalSumNds = sum + sumNds;
            const totalSumNdsStr = Number(totalSumNds).toFixed(2);

            countSum += Number(sumStr);
            countSumNds += Number(sumNdsStr);
            countSumTotal += Number(totalSumNdsStr);

            array.push([
              `${i + 1}`,
              `${item.dp_name}, ${item.dp_model}`,
              'шт.',
              `${count}`,
              `${costStr}`,
              `${sumStr}`,
              '20%',
              `${sumNdsStr}`,
              `${totalSumNdsStr}`,
            ]);
            length += 1;

            orderItemsArray.push({
              dp_itemId: orderItem.dp_itemId,
              dp_orderId: uuid,
              dp_cost: item.dp_cost,
              dp_count: orderItem.dp_count,
            });

            emailOrderItems.push({
              index: length,
              dp_name: item.dp_name,
              dp_model: item.dp_model,
              dp_photoUrl: item.dp_photoUrl,
              dp_cost: costStr,
              dp_count: orderItem.dp_count,
              dp_sum: sumStr,
              dp_edIzm: 'шт.',
              dp_stavkaNds: '20%',
              dp_sumNds: sumNdsStr,
              dp_totalSumNds: totalSumNdsStr,
            });
          }
        }
      }
      array.push([
        '',
        '',
        '',
        '',
        'Итого',
        `${countSum}`,
        'x',
        `${countSumNds}`,
        `${countSumTotal}`,
      ]);
      array.push(['']);

      const sumNdsText = numberToWordsRu(countSumNds);
      const sumTotalText = numberToWordsRu(countSumTotal);
      array.push([`Сумма НДС: ${sumNdsText}`]);
      array.push([`Всего к оплате на сумму с НДС: ${sumTotalText}`]);

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Лист 1');

      // Заполнение ячеек данными
      worksheet.addRows(array);

      // Объединение ячеек
      for (let i = 1; i <= 11; i++) {
        worksheet.mergeCells(`A${i}:I${i}`);
      }

      // Установка высоты строки
      worksheet.getRow(13).height = 40;

      // Выравнивание текста в ячейке по центру
      worksheet.getCell('A6').alignment = { horizontal: 'center' };

      // Выравнивание текста в ячейке по центру для строки 13 (с заголовками)
      ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'].forEach((e) => {
        worksheet.getCell(`${e}13`).alignment = {
          vertical: 'middle',
          horizontal: 'center',
        };
      });

      // Установка ширины столбцов
      worksheet.getColumn('A').width = 5;
      worksheet.getColumn('B').width = 30;
      worksheet.getColumn('C').width = 20;
      worksheet.getColumn('D').width = 20;
      worksheet.getColumn('E').width = 20;
      worksheet.getColumn('F').width = 20;
      worksheet.getColumn('G').width = 20;
      worksheet.getColumn('H').width = 20;
      worksheet.getColumn('I').width = 20;

      // Установка рамки для ячеек 13 строки
      worksheet.getRow(13).eachCell((cell) => {
        cell.border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' },
        };
      });
      for (let i = 1; i <= length; ++i) {
        worksheet.getRow(13 + i).eachCell((cell) => {
          cell.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' },
          };
        });

        ['C', 'G'].forEach((e) => {
          worksheet.getCell(`${e}${13 + i}`).alignment = {
            horizontal: 'center',
          };
        });

        ['D', 'E', 'F', 'H', 'I'].forEach((e) => {
          worksheet.getCell(`${e}${13 + i}`).alignment = {
            horizontal: 'right',
          };
        });
      }

      ['E', 'F', 'G', 'H', 'I'].forEach((e) => {
        worksheet.getCell(`${e}${13 + length + 1}`).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' },
        };
      });

      ['E', 'F', 'H', 'I'].forEach((e) => {
        worksheet.getCell(`${e}${13 + length + 1}`).alignment = {
          horizontal: 'right',
        };
      });

      worksheet.getCell(`G${13 + length + 1}`).alignment = {
        horizontal: 'center',
      };

      const buffer = await workbook.xlsx.writeBuffer();

      await queryRunner.manager
        .getRepository(OrderItemsEntity)
        .insert(orderItemsArray);

      const unpName = user.dp_shortNameLegalEntity.replace(/\s/g, '-');
      const unp = user.dp_unp;
      const filename = `Счёт-№${order.dp_number}-от-${stringDate}-${unpName}-${unp}.xlsx`;

      const emails = [user.dp_email, process.env.APP__ORG_MANAGER_EMAIL];

      const candidate_sendMailOptions: ISendMailOptions = {
        to: emails.join(),
        subject: `Заявка | ${process.env.APP__SWAGGER_ORGANIZATION}`,
        template: 'order',
        context: {
          order,
          user,
          stringDate,
          emailOrderItems,
          countSum,
          countSumNds,
          countSumTotal,
          APP__MY_ORGANIZATION: process.env.APP__MY_ORGANIZATION,
          APP__MY_CHECKING_ACCOUNT: process.env.APP__MY_CHECKING_ACCOUNT,
          APP__MY_BANK: process.env.APP__MY_BANK,
          APP__MY_BIK: process.env.APP__MY_BIK,
          APP__MY_UNP: process.env.APP__MY_UNP,
          APP__MY_ADDRESS: process.env.APP__MY_ADDRESS,
          sumNdsText,
          sumTotalText,
        },
        attachments: [{ filename, content: buffer }],
      };

      try {
        await this.mailerService.sendMail(candidate_sendMailOptions);
      } catch (err) {
        const message = `Сообщение не отправлено на почту пользователю err=(${err})`;
        throw new Error(message);
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

  async findAll(req: Request) {
    const payload = await this.userService.getAccessTokenFromRequest(req);
    return await this.orderEntity.find({
      where: {
        dp_userId: payload.id,
      },
      relations: ['dp_orderItems', 'dp_orderStatuses'],
      order: { dp_date: 'DESC' },
    });
  }

  async findOne(id: string, req: Request) {
    const payload = await this.userService.getAccessTokenFromRequest(req);
    return await this.orderEntity.findOneOrFail({
      where: {
        dp_id: id,
        dp_userId: payload.id,
      },
      relations: ['dp_orderItems', 'dp_orderStatuses'],
    });
  }

  async patchIsCanceledByClient(id: string, req: Request) {
    const payload = await this.userService.getAccessTokenFromRequest(req);
    const candidate = await this.orderEntity.findOneOrFail({
      where: {
        dp_id: id,
        dp_userId: payload.id,
      },
    });

    if (candidate.dp_canceledByManagerOn) {
      const message =
        'Вы не можите отменить заявку, так как заявка уже отменена менеджером.';
      const status = HttpStatus.CONFLICT;
      throw new HttpException(message, status);
    }

    if (candidate.dp_sentedByManagerOn) {
      const message =
        'Вы не можите отменить заявку, так как заявка уже отправлена менеджером.';
      const status = HttpStatus.CONFLICT;
      throw new HttpException(message, status);
    }

    if (candidate.dp_receivedByClientOn) {
      const message =
        'Вы не можите отменить заявку, так как заявка уже получена вами.';
      const status = HttpStatus.CONFLICT;
      throw new HttpException(message, status);
    }

    await this.orderEntity.update(id, { dp_canceledByClientOn: new Date() });

    return HttpResponse.successUpdate();
  }

  async patchIsReceivedByClient(id: string, req: Request) {
    const payload = await this.userService.getAccessTokenFromRequest(req);
    const candidate = await this.orderEntity.findOneOrFail({
      where: {
        dp_id: id,
        dp_userId: payload.id,
      },
    });

    if (candidate.dp_canceledByClientOn) {
      const message =
        'Вы не можите подтвердить приход заявки, так как отказались от неё.';
      const status = HttpStatus.CONFLICT;
      throw new HttpException(message, status);
    }

    if (candidate.dp_canceledByManagerOn) {
      const message =
        'Вы не можите подтвердить приход заявки, так как менеджер отменил её.';
      const status = HttpStatus.CONFLICT;
      throw new HttpException(message, status);
    }

    if (!candidate.dp_sentedByManagerOn) {
      const message =
        'Вы не можите подтвердить заявку, так как заявка ещё не отправлена менеджером.';
      const status = HttpStatus.CONFLICT;
      throw new HttpException(message, status);
    }

    if (candidate.dp_receivedByClientOn) {
      const message =
        'Вы не можите подтвердить заявку, так как заявка уже вами подтверждена.';
      const status = HttpStatus.CONFLICT;
      throw new HttpException(message, status);
    }

    await this.orderEntity.update(id, { dp_receivedByClientOn: new Date() });

    return HttpResponse.successUpdate();
  }
}
