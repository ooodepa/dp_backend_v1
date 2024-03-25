import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InvoicePlusEntity } from './invoice-plus.entity';
import { ItemEntity } from '../../items/entities/item.entity';

@Entity('DP_LST_InvoicePlusItems')
export class LstInvoicePlusItemsEntity {
  @PrimaryGeneratedColumn()
  dp_id: number;

  @ManyToOne(() => InvoicePlusEntity, (e: InvoicePlusEntity) => e.dp_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'dp_invoicePlusId' })
  @Column({ length: 36 })
  dp_invoicePlusId: string;

  // @ManyToOne(() => ItemEntity, (e: ItemEntity) => e.dp_id, {
  //   onDelete: 'CASCADE',
  // })
  // @JoinColumn({ name: 'dp_itemId' })
  // @Column({ nullable: true, length: 36 })
  // dp_itemId: string;

  @Column()
  dp_vendorId: string;

  @Column()
  dp_count: number;

  @Column({ nullable: true })
  dp_comment: string;
}
