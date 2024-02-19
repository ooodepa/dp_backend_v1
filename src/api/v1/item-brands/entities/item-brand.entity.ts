import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('DP_CTL_ItemBrands')
export class ItemBrandEntity {
  @PrimaryGeneratedColumn()
  dp_id: number;

  @Index('UNI_ctlItemBrands_name', { unique: true })
  @Column()
  dp_name: string;

  @Column({ default: '' })
  dp_photoUrl: string;

  @Index('UNI_ctlItemBrands_urlSegment', { unique: true })
  @Column()
  dp_urlSegment: string;

  @Column({ default: 10000 })
  dp_sortingIndex: number;

  @Column({ default: '' })
  dp_seoKeywords: string;

  @Index('UNI_ctlItemBrands_seoDescription', { unique: true })
  @Column({ default: '' })
  dp_seoDescription: string;

  @Column({ default: false })
  dp_isHidden: boolean;
}
