import { ApiPropertyOptions } from '@nestjs/swagger';

interface IProps {
  dp_id: ApiPropertyOptions;
  dp_name: ApiPropertyOptions;
  dp_photoUrl: ApiPropertyOptions;
  dp_urlSegment: ApiPropertyOptions;
  dp_sortingIndex: ApiPropertyOptions;
  dp_seoKeywords: ApiPropertyOptions;
  dp_seoDescription: ApiPropertyOptions;
  dp_isHidden: ApiPropertyOptions;
}

const ItemBrandsApiProperty: IProps = {
  dp_id: {
    example: 1,
  },
  dp_name: {
    example: 'DE-PA Electric',
  },
  dp_photoUrl: {
    example: 'https://example.com/img.png',
  },
  dp_urlSegment: {
    example: 'de-pa-electric',
  },
  dp_sortingIndex: {
    example: 10000,
  },
  dp_seoKeywords: {
    example: 'de-pa electric',
  },
  dp_seoDescription: {
    example: 'Продукция DE-PA Electric',
  },
  dp_isHidden: {
    example: false,
  },
};

export default ItemBrandsApiProperty;
