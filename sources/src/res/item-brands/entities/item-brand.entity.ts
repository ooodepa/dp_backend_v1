import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('DP_CTL_ItemBrands')
export class ItemBrandEntity {
  @PrimaryGeneratedColumn()
  dp_id: number;

  @Column({ unique: true })
  dp_name: string;

  @Column({ default: 10000 })
  dp_sortingIndex: number;

  @Column({ default: '' })
  dp_photoUrl: string;

  @Column({ unique: true })
  dp_urlSegment: string;

  @Column({ default: '' })
  dp_seoKeywords: string;

  @Column({ default: '' })
  dp_seoDescription: string;

  @Column({ default: false })
  dp_isHidden: boolean;
}
