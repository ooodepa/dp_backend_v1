import {
  Column,
  Entity,
  Generated,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { OrderItemsEntity } from './order-items.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { OrderStatusEntity } from '../../order-statuses/entities/order-status.entity';

@Entity('DP_DOC_Orders')
export class OrderEntity {
  @ApiProperty({ example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' })
  @PrimaryGeneratedColumn('uuid')
  dp_id: string;

  @Column()
  @Index({ unique: true })
  @Generated('increment')
  dp_number: number;

  @ApiProperty({ required: false, example: '0000-00-00T00:00:00.000Z' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP()' })
  dp_date: Date;

  @ApiProperty({ example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' })
  @ManyToOne(() => UserEntity, (e: UserEntity) => e.dp_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'dp_userId' })
  @Column()
  dp_userId: number;

  @ApiProperty({ type: [OrderItemsEntity] })
  @OneToMany(() => OrderItemsEntity, (e: OrderItemsEntity) => e.dp_orderId)
  @JoinColumn({ name: 'dp_id' })
  dp_orderItems: OrderItemsEntity[];

  @ApiProperty({ example: '0000-00-00T00:00:00.000Z' })
  @Column({ type: 'timestamp', nullable: true })
  dp_canceledByClientOn: Date;

  @ApiProperty({ example: '0000-00-00T00:00:00.000Z' })
  @Column({ type: 'timestamp', nullable: true })
  dp_canceledByManagerOn: Date;

  @ApiProperty({ example: '0000-00-00T00:00:00.000Z' })
  @Column({ type: 'timestamp', nullable: true })
  dp_sentedByManagerOn: Date;

  @ApiProperty({ example: '0000-00-00T00:00:00.000Z' })
  @Column({ type: 'timestamp', nullable: true })
  dp_receivedByClientOn: Date;

  @OneToMany(() => OrderStatusEntity, (e: OrderStatusEntity) => e.dp_orderId)
  @JoinColumn({ name: 'dp_id' })
  dp_orderStatuses: OrderStatusEntity[];
}
