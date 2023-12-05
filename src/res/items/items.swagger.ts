import { ApiPropertyOptions } from '@nestjs/swagger';

interface IProps {
  dp_id: ApiPropertyOptions;
  dp_name: ApiPropertyOptions;
  dp_model: ApiPropertyOptions;
  dp_cost: ApiPropertyOptions;
  dp_photoUrl: ApiPropertyOptions;
  dp_itemCategoryId: ApiPropertyOptions;
  dp_seoKeywords: ApiPropertyOptions;
  dp_seoDescription: ApiPropertyOptions;
  dp_isHidden: ApiPropertyOptions;
}

const ItemsApiProperty: IProps = {
  dp_id: {
    example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  },
  dp_name: {
    example: 'Розетка тройная встравая с заземлением',
  },
  dp_model: {
    example: '10012',
  },
  dp_cost: {
    example: 10.61,
  },
  dp_photoUrl: {
    example: 'https://example.com/img.png',
  },
  dp_itemCategoryId: {
    example: 1,
  },
  dp_seoKeywords: {
    example: 'розетка розетки',
  },
  dp_seoDescription: {
    example: 'Розетка тройная встравая с заземлением. 10012',
  },
  dp_isHidden: {
    example: false,
  },
};

export default ItemsApiProperty;
