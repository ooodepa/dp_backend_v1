import { ApiPropertyOptions } from '@nestjs/swagger';

interface IProps {
  dp_id: ApiPropertyOptions;
  dp_name: ApiPropertyOptions;
  dp_urlSegment: ApiPropertyOptions;
  dp_photoUrl: ApiPropertyOptions;
  dp_sortingIndex: ApiPropertyOptions;
  dp_seoKeywords: ApiPropertyOptions;
  dp_seoDescription: ApiPropertyOptions;
  dp_isHidden: ApiPropertyOptions;
  dp_itemBrandId: ApiPropertyOptions;
}

const ItemCategoriesApiProperty: IProps = {
  dp_id: {
    example: 0,
  },
  dp_name: {
    example: 'Аксессуары',
  },
  dp_photoUrl: {
    example: 'https://example.com/img.png',
  },
  dp_urlSegment: {
    example: 'dp-accessories',
  },
  dp_sortingIndex: {
    example: 10000,
  },
  dp_seoKeywords: {
    example: 'вилка вилки патроны патрон',
  },
  dp_seoDescription: {
    example: 'Продукты DE-PA Electric. Аксессуары',
  },
  dp_isHidden: {
    example: false,
  },
  dp_itemBrandId: {
    example: 0,
    required: false,
  },
};

export default ItemCategoriesApiProperty;
