import { ApiPropertyOptions } from '@nestjs/swagger';

interface IProps {
  dp_id: ApiPropertyOptions;
  dp_itemId: ApiPropertyOptions;
  dp_photoUrl: ApiPropertyOptions;
}

const LstItemGaleryApiProperty: IProps = {
  dp_id: {
    example: 0,
  },
  dp_itemId: {
    example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  },
  dp_photoUrl: {
    example:
      'https://ooodepa.github.io/ooodepa_imgs/products/de-pa-electric/accessories/10012-1.png',
  },
};

export default LstItemGaleryApiProperty;
