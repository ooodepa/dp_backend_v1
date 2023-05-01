import { ApiPropertyOptions } from '@nestjs/swagger';

interface IProps {
  dp_id: ApiPropertyOptions;
  dp_name: ApiPropertyOptions;
  dp_sortingIndex: ApiPropertyOptions;
  dp_urlSegment: ApiPropertyOptions;
  dp_photoUrl: ApiPropertyOptions;
  dp_seoKeywords: ApiPropertyOptions;
  dp_seoDescription: ApiPropertyOptions;
  dp_isHidden: ApiPropertyOptions;
  dp_itemBrandId: ApiPropertyOptions;
}

const ItemCategoryApiProperty: IProps = {
  dp_id: {
    example: 0,
  },
  dp_name: {
    example: 'Аксессуары',
  },
  dp_sortingIndex: {
    example: 10000,
  },
  dp_photoUrl: {
    example:
      'https://ooodepa.github.io/ooodepa_imgs/products/de-pa-electric/accessories/11202.png',
  },
  dp_urlSegment: {
    example: 'dp-accessories',
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
  dp_itemBrandId: {
    example: 0,
    required: false,
  },
};

export default ItemCategoryApiProperty;
