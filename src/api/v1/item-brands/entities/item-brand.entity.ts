import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('DP_CTL_ItemBrands')
export class ItemBrandEntity {
  @PrimaryGeneratedColumn()
  dp_id: number;

  @Index('UNI_ctlItemBrands_name', { unique: true })
  @Column()
  dp_seoTitle: string;

  // @Index('UNI_ctlItemBrands_seoDescription', { unique: true })
  @Column({ type: 'text' })
  dp_seoDescription: string;

  @Column({ type: 'text' })
  dp_seoKeywords: string;

  @Index('UNI_ctlItemBrands_urlSegment', { unique: true })
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
}
