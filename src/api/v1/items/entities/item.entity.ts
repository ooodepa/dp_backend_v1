import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { LstItemGaleryEntity } from './item-galery.entity';
import { LstItemCharacteristicEntity } from './item-characteristics.entity';
import { ItemCategoryEntity } from '../../item-categories/entities/item-category.entity';

@Entity('DP_CTL_Items')
export class ItemEntity {
  @PrimaryGeneratedColumn('uuid')
  dp_id: string;

  @Index('UNI_ctlItems_name', { unique: true })
  @Column()
  dp_name: string;

  @Index('UNI_ctlItems_model', { unique: true })
  @Column({ length: 32 })
  dp_model: string;

  @Column({ type: 'float' })
  dp_cost: number;

  @Column({ default: '' })
  dp_photoUrl: string;

  @ManyToOne(() => ItemCategoryEntity, (e: ItemCategoryEntity) => e.dp_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'dp_itemCategoryId' })
  @Column()
  dp_itemCategoryId: number;

  @OneToMany(
    () => LstItemCharacteristicEntity,
    (e: LstItemCharacteristicEntity) => e.dp_itemId,
  )
  @JoinColumn({ name: 'dp_id' })
  dp_itemCharacteristics: LstItemCharacteristicEntity[];

  @OneToMany(() => LstItemGaleryEntity, (e: LstItemGaleryEntity) => e.dp_itemId)
  @JoinColumn({ name: 'dp_id' })
  dp_itemGalery: LstItemGaleryEntity[];

  @Column({ default: '' })
  dp_seoKeywords: string;

  @Index('UNI_ctlItems_seoDescription', { unique: true })
  @Column({ default: '' })
  dp_seoDescription: string;

  @Column({ default: false })
  dp_isHidden: boolean;
}
