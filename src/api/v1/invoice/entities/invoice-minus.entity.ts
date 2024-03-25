import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LstInvoiceMinusItemsEntity } from './lst-invoice-minus-items.entity';

@Entity('DP_DOC_InvoiceMinus')
export class InvoiceMinusEntity {
  @PrimaryGeneratedColumn('uuid')
  dp_id: string;

  @Column({ type: 'timestamp', default: 'CURRENT_TIMESTAMP' })
  dp_date: Date;

  @Column({ nullable: true })
  dp_number: string;

  @Column({ nullable: true })
  dp_comment: string;

  @OneToMany(
    () => LstInvoiceMinusItemsEntity,
    (e: LstInvoiceMinusItemsEntity) => e.dp_invoiceMinusId,
  )
  @JoinColumn({ name: 'dp_id' })
  dp_invoiceMinusItems: LstInvoiceMinusItemsEntity[];
}
