import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { OrderEntity } from '../../orders/entities/order.entity';

@Entity('DP_DOC_OrderStatuses')
export class OrderStatusEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  dp_id: number;

  @ApiProperty({ required: false, example: '0000-00-00T00:00:00.000Z' })
  @Column({ type: 'timestamp', default: 'CURRENT_TIMESTAMP' })
  dp_date: Date;

  @ApiProperty()
  @Column({})
  dp_status: string;

  @ApiProperty({ example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' })
  @ManyToOne(() => OrderEntity, (e: OrderEntity) => e.dp_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'dp_orderId' })
  @Column({ length: 36 })
  dp_orderId: string;
}
