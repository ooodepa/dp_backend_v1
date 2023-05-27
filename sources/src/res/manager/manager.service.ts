import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from '../users/entities/user.entity';
import { OrderEntity } from '../orders/entities/order.entity';
import HttpResponse from 'src/utils/HttpResponseDto/HttpResponse';
import ManagerGetOrderQuery from './dto/manager-get-order-query.dto';

@Injectable()
export class ManagerService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderEntity: Repository<OrderEntity>,
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
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
      relations: ['dp_orderItems'],
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

  async UpdateOrderIsCompleted(id: string) {
    await this.orderEntity.findOneOrFail({ where: { dp_id: id } });
    await this.orderEntity.update(id, { dp_isCompleted: true });
    return HttpResponse.successUpdate();
  }
}
