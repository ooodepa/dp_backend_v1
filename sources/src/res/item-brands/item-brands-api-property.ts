import { ApiPropertyOptions } from '@nestjs/swagger';

interface IProps {
    dp_id: ApiPropertyOptions;
    dp_name: ApiPropertyOptions;
    dp_sortingIndex: ApiPropertyOptions;
    dp_photoUrl: ApiPropertyOptions;
    dp_urlSegment: ApiPropertyOptions;
    dp_seoKeywords: ApiPropertyOptions;
    dp_seoDescription: ApiPropertyOptions;
    dp_isHidden: ApiPropertyOptions;
}

const ItemBrandApiProperty: IProps = {
  dp_id: {
    example: 0,
  },
  dp_name: {
    example: 'DE-PA Electric',
  },
  dp_sortingIndex: {
    example: 10000,
  },
  dp_photoUrl: {
    example:
      'https://ooodepa.github.io/ooodepa_imgs/productCategories/de-pa-electric-logo.png',
  },
  dp_urlSegment: {
    example: 'de-pa-electric',
  },
  dp_seoKeywords: {
    example: '',
  },
  dp_seoDescription: {
    example: '',
  },
  dp_isHidden: {
    example: false,
  },
};

export default ItemBrandApiProperty;
