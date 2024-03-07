import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ItemBrandEntity } from 'src/api/v1/item-brands/entities/item-brand.entity';

@Entity('DP_CTL_ItemCategories')
export class ItemCategoryEntity {
  @PrimaryGeneratedColumn()
  dp_id: number;

  @ManyToOne(() => ItemBrandEntity, (e: ItemBrandEntity) => e.dp_id, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'dp_itemBrandId' })
  @Column({ nullable: true, default: null })
  dp_itemBrandId: number;

  @Index('UNI_ctlItemCategories_name', { unique: true })
  @Column()
  dp_name: string;

  @Column({ default: '' })
  dp_photoUrl: string;

  @Index('UNI_ctlItemCategories_urlSegment', { unique: true })
  @Column()
  dp_urlSegment: string;

  @Column({ default: 10000 })
  dp_sortingIndex: number;

  @Column({ length: 2550, default: '-' })
  dp_seoKeywords: string;

  // @Index('UNI_ctlItemCategories_seoDescription', { unique: true })
  @Column({ length: 2550 })
  dp_seoDescription: string;

  @Column({ default: false })
  dp_isHidden: boolean;
}
