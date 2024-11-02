import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('OZON_CTL_ProductList')
export class OzonSellerProductListEntity {
  @PrimaryColumn()
  product_id: number;

  @Column({ type: 'text' })
  offer_id: string;

  @Column()
  is_fbo_visible: boolean;

  @Column()
  is_fbs_visible: boolean;

  @Column()
  archived: boolean;

  @Column()
  is_discounted: boolean;

  @Column({ type: 'text' })
  _raw_json: string;
}
