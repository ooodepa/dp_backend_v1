import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';

import { OrderEntity } from './entities/order.entity';
import { UsersService } from '../users/users.service';
import { CreateOrderDto } from './dto/create-order.dto';
import EmailOrderItem from './dto/email-order-item.dto';
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

    const candidate = await this.userEntity.findOneOrFail({
      where: { dp_id: payload.id },
    });

    const {
      dp_unp: dp_candidate_unp,
      dp_nameLegalEntity: dp_candidate_nameLegalEntity,
      dp_shortNameLegalEntity: dp_candidate_shortNameLegalEntity,
      dp_address: dp_candidate_address,
      dp_receptionPhone: dp_candidate_receptionPhone,
      dp_lastName: dp_candidate_lastName,
      dp_middleName: dp_candidate_middleName,
      dp_firstName: dp_candidate_firstName,
      dp_email: dp_candidate_email,
    } = candidate;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const savedItem = await queryRunner.manager
        .getRepository(OrderEntity)
        .save({ dp_userId: payload.id });

      const uuid = savedItem.dp_id;

      let orderItemsArray: OrderItemsEntity[] = [];
      let dp_items_orderItems: EmailOrderItem[] = [];
      let dp_totalSum = 0;
      for (let i = 0; i < createOrderDto.dp_orderItems.length; ++i) {
        for (let j = 0; j < items.length; ++j) {
          if (items[j].dp_id === createOrderDto.dp_orderItems[i].dp_itemId) {
            const { dp_id, dp_name, dp_model, dp_cost, dp_photoUrl } = items[j];

            const dp_count = createOrderDto.dp_orderItems[i].dp_count;

            const nds = 1.2;
            const dp_costNoNds = Number(dp_cost).toFixed(2);
            const dp_costNds = Number(dp_cost * nds).toFixed(2);
            const dp_sum = Number(dp_cost * nds * dp_count).toFixed(2);
            dp_totalSum += dp_cost * nds * dp_count;

            orderItemsArray.push({
              dp_itemId: dp_id,
              dp_orderId: uuid,
              dp_cost,
              dp_count,
            });

            dp_items_orderItems.push({
              dp_name,
              dp_model,
              dp_costNoNds,
              dp_count,
              dp_photoUrl,
              dp_costNds,
              dp_sum,
            });
          }
        }
      }

      await queryRunner.manager
        .getRepository(OrderItemsEntity)
        .insert(orderItemsArray);

      const dp_items_totalSum = Number(dp_totalSum).toFixed(2);

      const manager_sendMailOptions: ISendMailOptions = {
        to: dp_candidate_email,
        subject: `Заявка с данными | ${process.env.APP__SWAGGER_ORGANIZATION}`,
        template: 'order-manager',
        context: {
          dp_candidate_unp,
          dp_candidate_nameLegalEntity,
          dp_candidate_shortNameLegalEntity,
          dp_candidate_firstName,
          dp_candidate_lastName,
          dp_candidate_middleName,
          dp_candidate_receptionPhone,
          dp_candidate_address,
          dp_candidate_email,
          dp_items_orderItems,
          dp_items_totalSum,
        },
      };

      try {
        await this.mailerService.sendMail(manager_sendMailOptions);
      } catch (err) {
        const message = `Сообщение не отправлено на почту менеджеру err=(${err})`;
        throw new Error(message);
      }

      const emails = [dp_candidate_email, process.env.APP__ORG_MANAGER_EMAIL];

      const candidate_sendMailOptions: ISendMailOptions = {
        to: emails.join(),
        subject: `Заявка | ${process.env.APP__SWAGGER_ORGANIZATION}`,
        template: 'order',
        context: {
          dp_items_orderItems,
          dp_items_totalSum,
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

    return HttpResponse.successTransactionCreate();
  }

  async findAll(req: Request) {
    const payload = await this.userService.getAccessTokenFromRequest(req);
    return await this.orderEntity.find({
      where: {
        dp_userId: payload.id,
      },
      relations: ['dp_orderItems'],
      order: { dp_date: 'ASC' },
    });
  }

  async findOne(id: string, req: Request) {
    const payload = await this.userService.getAccessTokenFromRequest(req);
    return await this.orderEntity.findOneOrFail({
      where: {
        dp_id: id,
        dp_userId: payload.id,
      },
      relations: ['dp_orderItems'],
    });
  }

  async updateCompleted(id: string) {
    await this.orderEntity.findOneOrFail({ where: { dp_id: id } });
    await this.orderEntity.update(id, { dp_isCompleted: true });
    return HttpResponse.successUpdate();
  }

  async updateCancelled(id: string, req: Request) {
    const payload = await this.userService.getAccessTokenFromRequest(req);
    await this.orderEntity.findOneOrFail({
      where: {
        dp_id: id,
        dp_userId: payload.id,
      },
    });

    await this.orderEntity.update(id, { dp_isCancelled: true });

    return HttpResponse.successUpdate();
  }
}
