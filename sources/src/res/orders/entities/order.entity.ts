import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { OrderItemsEntity } from './order-items.entity';
import { UserEntity } from 'src/res/users/entities/user.entity';

@Entity('DP_DOC_Orders')
export class OrderEntity {
  @ApiProperty({ example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' })
  @PrimaryGeneratedColumn('uuid')
  dp_id: string;

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
  dp_cancaledOn: Date;

  @ApiProperty({ example: '0000-00-00T00:00:00.000Z' })
  @Column({ type: 'timestamp', nullable: true })
  dp_fulfilledOn: Date;

  @ApiProperty({ example: '0000-00-00T00:00:00.000Z' })
  @Column({ type: 'timestamp', nullable: true })
  dp_receivedOn: Date;
}
