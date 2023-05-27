import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderEntity } from '../orders/entities/order.entity';
import { OrderStatusesService } from './order-statuses.service';
import { OrderStatusEntity } from './entities/order-status.entity';
import { OrderStatusesController } from './order-statuses.controller';

@Module({
  controllers: [OrderStatusesController],
  providers: [OrderStatusesService],
  imports: [TypeOrmModule.forFeature([OrderStatusEntity, OrderEntity])],
})
export class OrderStatusesModule {}
