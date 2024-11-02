export class OsonSellerProductListBodyJson {
  limit: number;
  filter: {
    visibility: 'ARCHIVED' | 'ALL';
  };
}
