import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('DP_CTL_ItemCharacteristics')
export class ItemCharacteristicEntity {
  @PrimaryGeneratedColumn()
  dp_id: number;

  @Index('UNI_ctlItemCharacteristics_name', { unique: true })
  @Column()
  dp_name: string;

  @Column({ default: false })
  dp_isHidden: boolean;
}
