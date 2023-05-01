import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ItemBrandEntity } from 'src/res/item-brands/entities/item-brand.entity';

@Entity('DP_CTL_ItemCategories')
export class ItemCategoryEntity {
  @PrimaryGeneratedColumn()
  dp_id: number;

  @Column({ unique: true })
  dp_name: string;

  @Column({ default: 10000 })
  dp_sortingIndex: number;

  @Column({ unique: true })
  dp_urlSegment: string;

  @Column({ default: '' })
  dp_photoUrl: string;

  @Column({ default: '' })
  dp_seoKeywords: string;

  @Column({ default: '' })
  dp_seoDescription: string;

  @Column({ default: false })
  dp_isHidden: boolean;

  @ManyToOne(() => ItemBrandEntity, (e: ItemBrandEntity) => e.dp_id, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'dp_itemBrandId' })
  @Column({ nullable: true, default: null })
  dp_itemBrandId: number;
}
