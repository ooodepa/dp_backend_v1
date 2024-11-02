export class OsonSellerProductListResponse {
  result: {
    items: {
      product_id: number;
      offer_id: string;
      is_fbo_visible: boolean;
      is_fbs_visible: boolean;
      archived: boolean;
      is_discounted: boolean;
    }[];
  };
}
