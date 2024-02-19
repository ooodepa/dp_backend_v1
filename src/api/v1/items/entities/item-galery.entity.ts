import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ItemEntity } from './item.entity';

@Entity('DP_LST_ItemGalery')
export class LstItemGaleryEntity {
  @PrimaryGeneratedColumn()
  dp_id: number;

  @ManyToOne(() => ItemEntity, (e: ItemEntity) => e.dp_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'dp_itemId' })
  @Column({ length: 36 })
  dp_itemId: string;

  @Column()
  dp_photoUrl: string;
}
