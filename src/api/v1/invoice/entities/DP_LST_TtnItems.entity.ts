import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TtnEntity } from './DP_DOC_TTN.entity';

@Entity('DP_LST_TtnItems')
export class LstTtnItemsEntity {
  @PrimaryGeneratedColumn()
  dp_id: number;

  @ManyToOne(() => TtnEntity, (e: TtnEntity) => e.dp_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'dp_ttnId' })
  @Column({ length: 36 })
  dp_ttnId: string;

  @Column()
  dp_vendorId: string;

  @Column()
  dp_name: string;

  @Column()
  dp_unit: string;

  @Column()
  dp_count: number;

  @Column({ type: 'decimal', precision: 16, scale: 2 })
  dp_priceWithoutVat: number;

  @Column()
  dp_vatRate: number;

  @Column()
  dp_cargoSpaces: number;

  @Column()
  dp_cargoWeight: number;

  @Column()
  dp_note: string;
}
