import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

// @Entity('dp_ctl_itemcharacteristics')
export class ItemCharacteristicEntity {
  @PrimaryGeneratedColumn()
  dp_id: number;

  @Index('UNI_ctlItemCharacteristics_name', { unique: true })
  @Column()
  dp_name: string;

  @Column({ default: '' })
  dp_unit: string;

  @Column({ default: 10000 })
  dp_sortingIndex: number;

  @Column({ default: false })
  dp_isHidden: boolean;
}
