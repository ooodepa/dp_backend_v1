import * as ExcelJS from 'exceljs';
import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import { convert as numberToWordsRu } from 'number-to-words-ru';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';

import SendCheckDto from './dto/sendCheckDto';
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
import { CreateNoAuthOrderDto } from './dto/create-no-auth-order.dto';

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

    if (items.length === 0) {
      const message = 'Ни одной номенклатуры не найдено в БД.';
      const status = HttpStatus.NOT_FOUND;
      throw new HttpException(message, status);
    }

    const user = await this.userEntity.findOneOrFail({
      where: { dp_id: payload.id },
    });

    let uuid = '';
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const order = await queryRunner.manager
        .getRepository(OrderEntity)
        .save({ dp_userId: payload.id });

      uuid = order.dp_id;

      let length = 0;
      let quantity = 0;
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

            quantity += orderItem.dp_count;

            countSum += Number(sumStr);
            countSumNds += Number(sumNdsStr);
            countSumTotal += Number(totalSumNdsStr);

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

      const sumNdsText = numberToWordsRu(countSumNds);
      const sumTotalText = numberToWordsRu(countSumTotal);

      await queryRunner.manager
        .getRepository(OrderItemsEntity)
        .insert(orderItemsArray);

      const emails = [user.dp_email, process.env.APP__MY_MANAGER_EMAIL];
      const candidate_sendMailOptions: ISendMailOptions = {
        to: emails.join(),
        subject: `Заявка | ${process.env.APP__MY_ORGANIZATION}`,
        template: 'order',
        context: {
          DP_FIRST_NAME: user.dp_firstName,
          DP_LAST_NAME: user.dp_lastName,
          DP_MIDDLE_NAME: user.dp_middleName,
          DP_ORG_NAME: user.dp_nameLegalEntity,
          DP_ORG_SHORT_NAME: user.dp_shortNameLegalEntity,
          DP_EMAIL: user.dp_email,
          DP_PHONE: user.dp_receptionPhone,
          emailOrderItems,
          countSum: Number(countSum).toFixed(2),
          countSumNds: Number(countSumNds).toFixed(2),
          countSumTotal: Number(countSumTotal).toFixed(2),
          quantity: quantity,
          sumNdsText,
          sumTotalText,
        },
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

    return await this.orderEntity.findOneOrFail({
      where: {
        dp_id: uuid,
      },
    });
  }

  async createAsAnonim(dto: CreateNoAuthOrderDto) {
    const items = await this.itemEntity.find({
      where: {
        dp_id: In(dto.dp_orderItems.map((e) => e.dp_itemId)),
      },
    });

    if (items.length === 0) {
      const message = 'Ни одной номенклатуры не найдено в БД.';
      const status = HttpStatus.NOT_FOUND;
      throw new HttpException(message, status);
    }

    let uuid = '';
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const order = await queryRunner.manager
        .getRepository(OrderEntity)
        .save({ dp_userId: -1 });

      uuid = order.dp_id;

      let length = 0;
      let quantity = 0;
      let countSum = 0;
      let countSumNds = 0;
      let countSumTotal = 0;
      const orderItemsArray: OrderItemsEntity[] = [];
      const emailOrderItems: EmailOrderItemDto[] = [];
      for (let i = 0; i < dto.dp_orderItems.length; ++i) {
        const orderItem = dto.dp_orderItems[i];
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

            quantity += orderItem.dp_count;

            countSum += Number(sumStr);
            countSumNds += Number(sumNdsStr);
            countSumTotal += Number(totalSumNdsStr);

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

      const sumNdsText = numberToWordsRu(countSumNds);
      const sumTotalText = numberToWordsRu(countSumTotal);

      await queryRunner.manager
        .getRepository(OrderItemsEntity)
        .insert(orderItemsArray);

      const emails = [dto.dp_email, process.env.APP__MY_MANAGER_EMAIL];
      const candidate_sendMailOptions: ISendMailOptions = {
        to: emails.join(),
        subject: `Заявка | ${process.env.APP__MY_ORGANIZATION}`,
        template: 'order-no-auth',
        context: {
          DP_NAME: dto.dp_name,
          DP_EMAIL: dto.dp_email,
          DP_PHONE: dto.dp_phone,
          emailOrderItems,
          countSum: Number(countSum).toFixed(2),
          countSumNds: Number(countSumNds).toFixed(2),
          countSumTotal: Number(countSumTotal).toFixed(2),
          quantity: quantity,
          sumNdsText,
          sumTotalText,
        },
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

    return await this.orderEntity.findOneOrFail({
      where: {
        dp_id: uuid,
      },
    });
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

  async sendToEmailCheck(
    id: string,
    req: Request,
    dto: SendCheckDto,
    res: Response,
  ) {
    const payload = await this.userService.getAccessTokenFromRequest(req);

    const order = await this.orderEntity.findOneOrFail({
      where: {
        dp_id: id,
        dp_userId: payload.id,
      },
      relations: ['dp_orderItems'],
    });

    const user = await this.userEntity.findOneOrFail({
      where: {
        dp_id: payload.id,
      },
    });

    const setIds: Set<string> = new Set();
    order.dp_orderItems.forEach((e) => {
      setIds.add(e.dp_itemId);
    });

    const arrayIds = Array.from(setIds);

    const items = await this.itemEntity.find({
      where: {
        dp_id: In(arrayIds),
      },
    });

    try {
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
          `Р/сч: ${dto.dp_checkingAccount} в ${dto.dp_bank} код ${dto.dp_bik}, УНП: ${user.dp_unp}`,
        ],
        [],
        [
          '№ \nп/п',
          'Товары (работы, услуги)',
          'Единица изме- \nрения',
          'Цена, \nруб. коп.',
          'Коли- \nчество',
          'Сумма, \nруб. коп.',
          'Ставка НДС, \n%',
          'Сумма НДС, \nруб. коп.',
          'Всего с НДС, \nруб. коп.',
        ],
      ];

      let length = 0;
      let quantity = 0;
      let countSum = 0;
      let countSumNds = 0;
      let countSumTotal = 0;
      const emailOrderItems: EmailOrderItemDto[] = [];
      for (let i = 0; i < order.dp_orderItems.length; ++i) {
        const orderItem = order.dp_orderItems[i];
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

            quantity += orderItem.dp_count;

            countSum += Number(sumStr);
            countSumNds += Number(sumNdsStr);
            countSumTotal += Number(totalSumNdsStr);

            array.push([
              `${i + 1}`,
              `${item.dp_model} \n${item.dp_name}`,
              'шт.',
              `${costStr}`,
              `${count}`,
              `${sumStr}`,
              '20%',
              `${sumNdsStr}`,
              `${totalSumNdsStr}`,
            ]);
            length += 1;

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
        'Итого',
        `${quantity}`,
        `${Number(countSum).toFixed(2)}`,
        'x',
        `${Number(countSumNds).toFixed(2)}`,
        `${Number(countSumTotal).toFixed(2)}`,
      ]);
      array.push(['']);

      const sumNdsText = numberToWordsRu(Number(countSumNds).toFixed(2));
      const sumTotalText = numberToWordsRu(Number(countSumTotal).toFixed(2));
      array.push([`Сумма НДС: ${sumNdsText}`]);
      array.push([`Всего к оплате на сумму с НДС: ${sumTotalText}`]);

      array.push(['']);
      array.push([
        `${process.env.APP__MY_CHECK_POSITION} `,
        '',
        '',
        '',
        ` ${process.env.APP__MY_CHECK_INITIALS} ${process.env.APP__MY_CHECK_SURNAME}`,
      ]);
      const directorLine = array.length;

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

      // Установка ширины столбцов
      worksheet.getColumn('A').width = 5;
      worksheet.getColumn('B').width = 30;
      worksheet.getColumn('C').width = 8;
      worksheet.getColumn('D').width = 8;
      worksheet.getColumn('E').width = 9;
      worksheet.getColumn('F').width = 9;
      worksheet.getColumn('G').width = 6;
      worksheet.getColumn('H').width = 9;
      worksheet.getColumn('I').width = 9;

      for (let i = 1; i <= 12; ++i) {
        worksheet.getRow(i).eachCell((cell) => {
          cell.font = {
            size: 8,
          };
        });
      }

      worksheet.getRow(13).eachCell((cell) => {
        cell.border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' },
        };
        cell.alignment = {
          wrapText: true,
          horizontal: 'center',
          vertical: 'middle',
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
          cell.alignment = {
            wrapText: true,
            // vertical: 'top',
            // horizontal: 'left',
          };
        });

        ['C', 'G'].forEach((e) => {
          worksheet.getCell(`${e}${13 + i}`).alignment = {
            horizontal: 'center',
          };
        });

        ['A', 'D', 'E', 'F', 'H', 'I'].forEach((e) => {
          worksheet.getCell(`${e}${13 + i}`).alignment = {
            horizontal: 'right',
          };
        });
      }

      ['D', 'E', 'F', 'G', 'H', 'I'].forEach((e) => {
        worksheet.getCell(`${e}${13 + length + 1}`).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' },
        };
      });

      ['D', 'E', 'F', 'H', 'I'].forEach((e) => {
        worksheet.getCell(`${e}${13 + length + 1}`).alignment = {
          horizontal: 'right',
        };
      });

      worksheet.getCell(`G${13 + length + 1}`).alignment = {
        horizontal: 'center',
      };

      // Строка с должностью, подписью, инициалами и фамилией
      worksheet.mergeCells(`A${directorLine}:B${directorLine}`);
      worksheet.mergeCells(`C${directorLine}:D${directorLine}`);
      worksheet.mergeCells(`E${directorLine}:I${directorLine}`);
      worksheet.getCell(`A${directorLine}`).alignment = {
        horizontal: 'right',
      };
      worksheet.getCell(`C${directorLine}`).border = {
        bottom: { style: 'thin' },
      };

      // Установка размера шрифта для всего документа
      for (let i = 0; i < array.length; ++i) {
        worksheet.getRow(13 + i).eachCell((cell) => {
          cell.font = {
            size: 8,
          };
        });
      }

      const buffer = await workbook.xlsx.writeBuffer();

      const unpName = user.dp_shortNameLegalEntity.replace(/\s/g, '-');
      const unp = user.dp_unp;
      const filename =
        `Счёт-№${order.dp_number}-от-${stringDate}-${unpName}-${unp}.xlsx`.replace(
          /\s/g,
          '-',
        );
      const emails = [user.dp_email, process.env.APP__MY_MANAGER_EMAIL];

      try {
        await this.mailerService.sendMail({
          to: emails.join(),
          subject: `Счёт-фактура №${order.dp_number} от ${stringDate} | ${process.env.APP__MY_ORGANIZATION}`,
          template: 'check',
          context: {
            order,
            user,
            stringDate,
            emailOrderItems,
            countSum: Number(countSum).toFixed(2),
            countSumNds: Number(countSumNds).toFixed(2),
            countSumTotal: Number(countSumTotal).toFixed(2),
            quantity: quantity,
            APP__MY_ORGANIZATION: process.env.APP__MY_ORGANIZATION,
            APP__MY_CHECKING_ACCOUNT: process.env.APP__MY_CHECKING_ACCOUNT,
            APP__MY_BANK: process.env.APP__MY_BANK,
            APP__MY_BIK: process.env.APP__MY_BIK,
            APP__MY_UNP: process.env.APP__MY_UNP,
            APP__MY_ADDRESS: process.env.APP__MY_ADDRESS,
            sumNdsText,
            sumTotalText,
            bank: dto.dp_bank,
            bik: dto.dp_bik,
            checkingAccount: dto.dp_checkingAccount,
            APP__MY_CHECK_POSITION: process.env.APP__MY_CHECK_POSITION,
            APP__MY_CHECK_SURNAME: process.env.APP__MY_CHECK_SURNAME,
            APP__MY_CHECK_INITIALS: process.env.APP__MY_CHECK_INITIALS,
          },
          attachments: [{ filename, content: buffer }],
        });
      } catch (err) {
        const message = `Сообщение не отправлено на почту пользователю err=(${err})`;
        throw new Error(message);
      }
    } catch (exception) {
      const message = `${exception}`;
      const status = HttpStatus.CONFLICT;
      throw new HttpException(message, status);
    }

    res.status(HttpStatus.OK).json(HttpResponse.successSendEmail());
  }
}
