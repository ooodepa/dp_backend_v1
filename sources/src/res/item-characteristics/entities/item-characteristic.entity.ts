import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('DP_CTL_ItemCharacteristics')
export class ItemCharacteristicEntity {
  @PrimaryGeneratedColumn()
  dp_id: number;

  @Column({ unique: true })
  dp_name: string;
}
