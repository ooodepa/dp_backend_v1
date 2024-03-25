import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LstInvoicePlusItemsEntity } from './lst-invoice-plus-items.entity';

@Entity('DP_DOC_InvoicePlus')
export class InvoicePlusEntity {
  @PrimaryGeneratedColumn('uuid')
  dp_id: string;

  @Column({ type: 'timestamp', default: 'CURRENT_TIMESTAMP' })
  dp_date: Date;

  @Column({ nullable: true })
  dp_number: string;

  @Column({ nullable: true })
  dp_comment: string;

  @OneToMany(
    () => LstInvoicePlusItemsEntity,
    (e: LstInvoicePlusItemsEntity) => e.dp_invoicePlusId,
  )
  @JoinColumn({ name: 'dp_id' })
  dp_invoicePlusItems: LstInvoicePlusItemsEntity[];
}
