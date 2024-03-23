import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('DP_CTL_ItemCharacteristics')
export class ItemCharacteristicEntity {
  @PrimaryGeneratedColumn()
  dp_id: number;

  @Index('UNI_ctlItemCharacteristics_name', { unique: true })
  @Column()
  dp_name: string;

  @Column({ default: '-', length: 16 })
  dp_unit: string;

  @Column({ default: 10000 })
  dp_sortingIndex: number;

  @Column({ default: false })
  dp_isHidden: boolean;

  @Column({ default: false })
  dp_isFolder: boolean;

  @Column({ nullable: true, default: null })
  dp_parentId: number;
}
