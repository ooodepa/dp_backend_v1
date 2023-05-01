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
}

const ItemsApiProperty: IProps = {
  dp_id: {
    example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  },
  dp_name: {
    example: 'Розетка тройная встравая с заземлением',
  },
  dp_model: {
    example: 'dp-10012',
  },
  dp_cost: {
    example: 10.61,
  },
  dp_photoUrl: {
    example:
      'https://ooodepa.github.io/ooodepa_imgs/products/de-pa-electric/accessories/10012.png',
  },
  dp_itemCategoryId: {
    example: 1,
  },
  dp_seoKeywords: {
    example: '',
  },
  dp_seoDescription: {
    example: '',
  },
};

export default ItemsApiProperty;
