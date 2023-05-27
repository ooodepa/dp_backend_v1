import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('DP_DOC_OrderStatuses')
export class OrderStatusEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  dp_id: number;

  @ApiProperty({ required: false, example: '0000-00-00T00:00:00.000Z' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP()' })
  dp_date: Date;

  @ApiProperty()
  @Column({})
  dp_status: string;

  @ApiProperty({ example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' })
  @Column({ length: 36 })
  dp_orderId: string;
}
