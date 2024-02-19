import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { OrderEntity } from './order.entity';
import { ItemEntity } from 'src/api/v1/items/entities/item.entity';

@Entity('DP_LST_OrderItems')
export class OrderItemsEntity {
  @PrimaryGeneratedColumn()
  dp_id?: number;

  @ManyToOne(() => OrderEntity, (e: OrderEntity) => e.dp_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'dp_orderId' })
  @Column({ length: 36 })
  dp_orderId: string;

  @ApiProperty({ example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' })
  @ManyToOne(() => ItemEntity, (e: ItemEntity) => e.dp_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'dp_itemId' })
  @Column({ length: 36 })
  dp_itemId: string;

  @ApiProperty({ example: 1 })
  @Column()
  dp_count: number;

  @ApiProperty({ example: 1.23 })
  @Column({ type: 'float' })
  dp_cost: number;
}
