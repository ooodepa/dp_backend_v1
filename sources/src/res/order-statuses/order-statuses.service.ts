import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { OrderStatusEntity } from './entities/order-status.entity';

@Injectable()
export class OrderStatusesService {
  constructor(
    @InjectRepository(OrderStatusEntity)
    private readonly orderStatusEntity: Repository<OrderStatusEntity>,
  ) {}

  async findAll(id: string) {
    return await this.orderStatusEntity.find({
      where: {
        dp_orderId: id,
      },
      order: {
        dp_date: 'DESC',
      },
    });
  }
}
