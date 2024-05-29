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

  @Column({ length: 50 })
  dp_1cCode: string;

  @Column({ length: 150 })
  dp_1cDescription: string;

  @Column({ default: false })
  dp_1cIsFolder: boolean;

  @Column()
  dp_1cParentId: string;

  @Index('UNI_ctlItems_name', { unique: true })
  @Column()
  dp_seoTitle: string;

  // @Index('UNI_ctlItems_seoDescription', { unique: true })
  @Column({ type: 'text' })
  dp_seoDescription: string;

  @Column({ type: 'text' })
  dp_seoKeywords: string;

  @Index('UNI_ctlItems_model', { unique: true })
  @Column({ length: 50 })
  dp_seoUrlSegment: string;

  @Column({ type: 'text' })
  dp_textCharacteristics: string;

  @Column({ type: 'text' })
  dp_markdown: string;

  @Column({ type: 'text' })
  dp_photos: string;

  @Column({ type: 'text' })
  dp_photos360: string;

  @Column()
  dp_photoUrl: string;

  @Column()
  dp_wholesaleQuantity: number;

  @Column({ length: 255 })
  dp_brand: string;

  @Column({ length: 255 })
  dp_combinedName: string;

  @Column()
  dp_vendorIds: string;

  @Column({ length: 255 })
  dp_ozonIds: string;

  @Column({ default: 10000 })
  dp_sortingIndex: number;

  @Column({ type: 'text' })
  dp_youtubeIds: string;

  @Column({ type: 'text' })
  dp_barcodes: string;

  @Column()
  dp_length: number;

  @Column()
  dp_width: number;

  @Column()
  dp_height: number;

  @Column()
  dp_weight: number;

  @Column({ type: 'float' })
  dp_cost: number;

  @Column({ length: '3' })
  dp_currancy: string;

  @Column({ default: false })
  dp_isHidden: boolean;

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
}
