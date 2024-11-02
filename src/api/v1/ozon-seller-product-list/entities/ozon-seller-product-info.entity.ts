import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('OZON_CTL_ProductInfo')
export class OzonSellerProductInfoEntity {
  @PrimaryColumn()
  id: number;

  @Column({ nullable: true, type: 'text' })
  name: string;

  @Column({ nullable: true, type: 'text' })
  offer_id: string;

  @Column({ nullable: true, type: 'text' })
  barcode: string;

  @Column({ nullable: true, type: 'text' })
  buybox_price: string;

  @Column({ nullable: true })
  category_id: number;

  @Column({ nullable: true, type: 'text' })
  created_at: string;

  @Column({ nullable: true, type: 'text' })
  images: string;

  @Column({ nullable: true, type: 'text' })
  marketing_price: string;

  @Column({ nullable: true, type: 'text' })
  min_ozon_price: string;

  @Column({ nullable: true, type: 'text' })
  old_price: string;

  @Column({ nullable: true, type: 'text' })
  premium_price: string;

  @Column({ nullable: true, type: 'text' })
  price: string;

  @Column({ nullable: true, type: 'text' })
  recommended_price: string;

  @Column({ nullable: true, type: 'text' })
  min_price: string;

  @Column({ nullable: true, type: 'text' })
  sources: string;

  @Column({ nullable: true })
  stocks__coming: number;

  @Column({ nullable: true })
  stocks__present: number;

  @Column({ nullable: true })
  stocks__reserved: number;

  @Column({ nullable: true, type: 'text' })
  errors: string;

  @Column({ nullable: true, type: 'text' })
  vat: string;

  @Column({ nullable: true })
  visible: boolean;

  @Column({ nullable: true })
  visibility_details__has_price: boolean;

  @Column({ nullable: true })
  visibility_details__has_stock: boolean;

  @Column({ nullable: true })
  visibility_details__active_product: boolean;

  @Column({ nullable: true, type: 'text' })
  price_index: string;

  @Column({ nullable: true, type: 'text' })
  commissions: string;

  // @Column()
  // commissions_fbo__percent: number;

  // @Column()
  // commissions_fbo__min_value: number;

  // @Column({ type: 'float' })
  // commissions_fbo__value: number;

  // @Column({ type: 'text' })
  // commissions_fbo__sale_schema: string;

  // @Column()
  // commissions_fbo__delivery_amount: number;

  // @Column()
  // commissions_fbo__return_amount: number;

  // @Column()
  // commissions_fbs__percent: number;

  // @Column()
  // commissions_fbs__min_value: number;

  // @Column({ type: 'float' })
  // commissions_fbs__value: number;

  // @Column({ type: 'text' })
  // commissions_fbs__sale_schema: string;

  // @Column()
  // commissions_fbs__delivery_amount: number;

  // @Column()
  // commissions_fbs__return_amount: number;

  // @Column()
  // commissions_rfbs__percent: number;

  // @Column()
  // commissions_rfbs__min_value: number;

  // @Column({ type: 'float' })
  // commissions_rfbs__value: number;

  // @Column({ type: 'text' })
  // commissions_rfbs__sale_schema: string;

  // @Column()
  // commissions_rfbs__delivery_amount: number;

  // @Column()
  // commissions_rfbs__return_amount: number;

  // @Column()
  // commissions_fbp__percent: number;

  // @Column()
  // commissions_fbp__min_value: number;

  // @Column({ type: 'float' })
  // commissions_fbp__value: number;

  // @Column({ type: 'text' })
  // commissions_fbp__sale_schema: string;

  // @Column()
  // commissions_fbp__delivery_amount: number;

  // @Column()
  // commissions_fbp__return_amount: number;

  @Column({ nullable: true, type: 'text' })
  volume_weight: string;

  @Column({ nullable: true })
  is_prepayment: boolean;

  @Column({ nullable: true })
  is_prepayment_allowed: boolean;

  @Column({ nullable: true, type: 'text' })
  images360: string;

  @Column({ nullable: true, type: 'text' })
  color_image: string;

  @Column({ nullable: true, type: 'text' })
  primary_image: string;

  @Column({ nullable: true, type: 'text' })
  status: string;

  @Column({ nullable: true, type: 'text' })
  state: string;

  @Column({ nullable: true, type: 'text' })
  service_type: string;

  @Column({ nullable: true })
  fbo_sku: number;

  @Column({ nullable: true })
  fbs_sku: number;

  @Column({ nullable: true, type: 'text' })
  currency_code: string;

  @Column({ nullable: true })
  is_kgt: boolean;

  @Column({ nullable: true })
  discounted_stocks__coming: number;

  @Column({ nullable: true })
  discounted_stocks__present: number;

  @Column({ nullable: true })
  discounted_stocks__reserved: number;

  @Column({ nullable: true })
  is_discounted: boolean;

  @Column({ nullable: true })
  has_discounted_item: boolean;

  @Column({ nullable: true, type: 'text' })
  barcodes: string;

  @Column({ nullable: true, type: 'text' })
  updated_at: string;

  @Column({ nullable: true, type: 'text' })
  price_indexes: string;

  // @Column({ type: 'text' })
  // price_indexes__price_index: string;

  // @Column({ type: 'text' })
  // price_indexes__external_index_data__minimal_price: string;

  // @Column({ type: 'text' })
  // price_indexes__external_index_data__minimal_price_currency: string;

  // @Column()
  // price_indexes__external_index_data__price_index_value: number;

  // @Column({ type: 'text' })
  // price_indexes__ozon_index_data__minimal_price: string;

  // @Column({ type: 'text' })
  // price_indexes__ozon_index_data__minimal_price_currency: string;

  // @Column()
  // price_indexes__ozon_index_data__price_index_value: number;

  // @Column({ type: 'text' })
  // price_indexes__self_marketplaces_index_data__minimal_price: string;

  // @Column({ type: 'text' })
  // price_indexes__self_marketplaces_index_data__minimal_price_currency: string;

  // @Column()
  // price_indexes__self_marketplaces_index_data__price_index_value: number;

  @Column({ nullable: true })
  sku: number;

  @Column({ nullable: true })
  description_category_id: number;

  @Column({ nullable: true })
  type_id: number;

  @Column({ nullable: true })
  is_archived: boolean;

  @Column({ nullable: true })
  is_autoarchived: boolean;

  @Column({ type: 'text' })
  _raw_json: string;
}
