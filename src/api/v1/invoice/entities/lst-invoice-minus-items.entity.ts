import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InvoiceMinusEntity } from './invoice-minus.entity';
import { ItemEntity } from '../../items/entities/item.entity';

@Entity('DP_LST_InvoiceMinusItems')
export class LstInvoiceMinusItemsEntity {
  @PrimaryGeneratedColumn()
  dp_id: number;

  @ManyToOne(() => InvoiceMinusEntity, (e: InvoiceMinusEntity) => e.dp_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'dp_invoiceMinusId' })
  @Column({ length: 36 })
  dp_invoiceMinusId: string;

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
