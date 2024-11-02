export class OzonSellerProductInfoResponse {
  result: {
    id: number;
    name: string;
    offer_id: string;
    barcode: string;
    buybox_price: string;
    category_id: number;
    created_at: string;
    images: string;
    marketing_price: number;
    min_ozon_price: string;
    old_price: number;
    premium_price: string;
    price: number;
    recommended_price: string;
    min_price: string;
    sources: string;
    stocks: {
      coming: number;
      present: number;
      reserved: number;
    };
    errors: string;
    vat: number;
    visible: boolean;
    visibility_details: {
      has_price: boolean;
      has_stock: boolean;
      active_product: boolean;
    };
    price_index: number;
    commissions: {
      percent: number;
      min_value: number;
      value: number;
      sale_schema: string;
      delivery_amount: number;
      return_amount: number;
    }[];
    volume_weight: number;
    is_prepayment: boolean;
    is_prepayment_allowed: boolean;
    images360: string;
    color_image: string;
    primary_image: string;
    status: {
      state: string;
      state_failed: string;
      moderate_status: string;
      decline_reasons: string;
      validation_state: string;
      state_name: string;
      state_description: string;
      is_failed: boolean;
      is_created: boolean;
      state_tooltip: string;
      item_errors: {
        code: string;
        field: string;
        attribute_id: number;
        state: string;
        level: string;
        description: string;
      };
      state_updated_at: string;
    };
    state: string;
    service_type: string;
    fbo_sku: number;
    fbs_sku: number;
    currency_code: string;
    is_kgt: boolean;
    discounted_stocks: {
      coming: number;
      present: number;
      reserved: number;
    };
    is_discounted: boolean;
    has_discounted_item: boolean;
    barcodes: string;
    updated_at: string;
    price_indexes: {
      price_index: string;
      external_index_data: {
        minimal_price: string;
        minimal_price_currency: string;
        price_index_value: number;
      };
      ozon_index_data: {
        minimal_price: string;
        minimal_price_currency: string;
        price_index_value: number;
      };
      self_marketplaces_index_data: {
        minimal_price: string;
        minimal_price_currency: string;
        price_index_value: number;
      };
    };
    sku: number;
    description_category_id: number;
    type_id: number;
    is_archived: boolean;
    is_autoarchived: boolean;
  };
}
