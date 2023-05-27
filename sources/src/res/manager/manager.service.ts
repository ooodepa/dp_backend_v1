import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UserEntity } from '../users/entities/user.entity';
import { OrderEntity } from '../orders/entities/order.entity';
import HttpResponse from 'src/utils/HttpResponseDto/HttpResponse';
import ManagerGetOrderQuery from './dto/manager-get-order-query.dto';
import { OrderStatusEntity } from '../order-statuses/entities/order-status.entity';
import { CreateOrderStatusDto } from '../order-statuses/dto/create-order-status.dto';

@Injectable()
export class ManagerService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderEntity: Repository<OrderEntity>,
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
    @InjectRepository(OrderStatusEntity)
    private readonly orderStatusEntity: Repository<OrderStatusEntity>,
  ) {}

  async getOrders(query: ManagerGetOrderQuery) {
    let page = Number(query.page); // Выбранная страница
    let take = Number(query.take); // Количество элементов на странице
    console.log(query);

    if (isNaN(page) || page <= 0) {
      page = 1;
    }

    if (isNaN(take) || take <= 0) {
      take = 10;
    }

    const skip = (page - 1) * take;
    const [elements, totalCount] = await this.orderEntity.findAndCount({
      skip,
      take,
      order: {
        dp_date: 'DESC',
      },
      relations: ['dp_orderItems'],
    });

    const totalPages = Math.ceil(totalCount / take);
    const data = {
      take,
      page,
      totalPages,
      skip,
      data: elements,
    };

    return data;
  }

  async getOrder(id: string) {
    return await this.orderEntity.findOneOrFail({
      where: {
        dp_id: id,
      },
      relations: ['dp_orderItems', 'dp_orderStatuses'],
    });
  }

  async getUser(id: number) {
    return await this.userEntity.findOneOrFail({
      select: {
        dp_id: true,
        dp_unp: true,
        dp_nameLegalEntity: true,
        dp_shortNameLegalEntity: true,
        dp_address: true,
        dp_email: true,
        dp_receptionPhone: true,
        dp_firstName: true,
        dp_lastName: true,
        dp_middleName: true,
      },
      where: {
        dp_id: id,
      },
    });
  }

  async patchOrderIsCanceledByManager(id: string) {
    const candidate = await this.orderEntity.findOneOrFail({
      where: {
        dp_id: id,
      },
    });

    if (candidate.dp_canceledByClientOn) {
      const message =
        'Заявка не может быть отменена менеджером, так как она уже отменена клиентом.';
      const status = HttpStatus.CONFLICT;
      throw new HttpException(message, status);
    }

    if (candidate.dp_canceledByManagerOn) {
      const message =
        'Заявка не может быть отменена менеджером, так как она уже отменена.';
      const status = HttpStatus.CONFLICT;
      throw new HttpException(message, status);
    }

    if (candidate.dp_sentedByManagerOn) {
      const message =
        'Заявка не может быть отменена менеджером, так как она уже её отправил.';
      const status = HttpStatus.CONFLICT;
      throw new HttpException(message, status);
    }

    if (candidate.dp_canceledByClientOn) {
      const message =
        'Заявка не может быть отменена менеджером, так как она уже получена клиентом.';
      const status = HttpStatus.CONFLICT;
      throw new HttpException(message, status);
    }

    await this.orderEntity.update(id, { dp_canceledByManagerOn: new Date() });

    return HttpResponse.successUpdate();
  }

  async patchOrderIsSentedByManager(id: string) {
    const candidate = await this.orderEntity.findOneOrFail({
      where: {
        dp_id: id,
      },
    });

    if (candidate.dp_canceledByClientOn) {
      const message =
        'Заявка не может быть отправлена менеджером, так как она отменена клиентом.';
      const status = HttpStatus.CONFLICT;
      throw new HttpException(message, status);
    }

    if (candidate.dp_canceledByManagerOn) {
      const message =
        'Заявка не может быть отправлена менеджером, так как она уже отклонена им.';
      const status = HttpStatus.CONFLICT;
      throw new HttpException(message, status);
    }

    if (candidate.dp_sentedByManagerOn) {
      const message =
        'Заявка не может быть отправлена менеджером, так как он уже её отправил.';
      const status = HttpStatus.CONFLICT;
      throw new HttpException(message, status);
    }

    if (candidate.dp_canceledByClientOn) {
      const message =
        'Заявка не может быть отправлена менеджером, так как она уже получена клиентом.';
      const status = HttpStatus.CONFLICT;
      throw new HttpException(message, status);
    }

    await this.orderEntity.update(id, { dp_sentedByManagerOn: new Date() });

    return HttpResponse.successUpdate();
  }

  async createOrderStatus(createOrderStatusDto: CreateOrderStatusDto) {
    const candidate = await this.orderEntity.findOneOrFail({
      where: {
        dp_id: createOrderStatusDto.dp_orderId,
      },
    });

    if (candidate.dp_canceledByClientOn) {
      const message =
        'Нельзя указывать статусы для отмененного заказа клиентом';
      const status = HttpStatus.CONFLICT;
      throw new HttpException(message, status);
    }

    if (candidate.dp_canceledByManagerOn) {
      const message =
        'Нельзя указывать статусы для отмененного заказа менеджером';
      const status = HttpStatus.CONFLICT;
      throw new HttpException(message, status);
    }

    if (candidate.dp_receivedByClientOn) {
      const message = 'Нельзя указывать статусы для полученого заказа клиентом';
      const status = HttpStatus.CONFLICT;
      throw new HttpException(message, status);
    }

    await this.orderStatusEntity.save(createOrderStatusDto);
    return HttpResponse.successCreate();
  }

  async removeOrderStatus(id: number, orderId: string) {
    await this.orderStatusEntity.findOneOrFail({
      where: {
        dp_id: id,
        dp_orderId: orderId,
      },
    });

    const candidate = await this.orderEntity.findOneOrFail({
      where: {
        dp_id: orderId,
      },
    });

    if (candidate.dp_canceledByClientOn) {
      const message = 'Нельзя удалять статусы для отмененного заказа';
      const status = HttpStatus.CONFLICT;
      throw new HttpException(message, status);
    }

    if (candidate.dp_canceledByManagerOn) {
      const message = 'Нельзя удалять статусы для отмененного заказа';
      const status = HttpStatus.CONFLICT;
      throw new HttpException(message, status);
    }

    if (candidate.dp_receivedByClientOn) {
      const message = 'Нельзя удалять статусы для полученного заказа клиентом';
      const status = HttpStatus.CONFLICT;
      throw new HttpException(message, status);
    }

    await this.orderStatusEntity.delete({
      dp_id: id,
      dp_orderId: orderId,
    });

    return HttpResponse.successDeleted();
  }
}
