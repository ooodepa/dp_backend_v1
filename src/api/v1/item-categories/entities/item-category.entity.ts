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

  @Index('UNI_ctlItemCategories_name', { unique: true })
  @Column()
  dp_seoTitle: string;

  // @Index('UNI_ctlItemCategories_seoDescription', { unique: true })
  @Column({ type: 'text' })
  dp_seoDescription: string;

  @Column({ type: 'text' })
  dp_seoKeywords: string;

  @Index('UNI_ctlItemCategories_urlSegment', { unique: true })
  @Column()
  dp_seoUrlSegment: string;

  @Column({ type: 'text' })
  dp_photos: string;

  @Column({ type: 'text' })
  dp_photos360: string;

  @Column({ default: '' })
  dp_photoUrl: string;

  @Column({ default: 10000 })
  dp_sortingIndex: number;

  @Column({ type: 'text' })
  dp_youtubeIds: string;

  @Column({ default: false })
  dp_isHidden: boolean;

  @ManyToOne(() => ItemBrandEntity, (e: ItemBrandEntity) => e.dp_id, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'dp_itemBrandId' })
  @Column({ nullable: true, default: null })
  dp_itemBrandId: number;
}
