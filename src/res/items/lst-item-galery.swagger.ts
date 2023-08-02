import { ApiPropertyOptions } from '@nestjs/swagger';

interface IProps {
  dp_id: ApiPropertyOptions;
  dp_itemId: ApiPropertyOptions;
  dp_photoUrl: ApiPropertyOptions;
}

const LstItemGaleryApiProperty: IProps = {
  dp_id: {
    example: 1,
  },
  dp_itemId: {
    example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  },
  dp_photoUrl: {
    example: 'https://example.com/img.png',
  },
};

export default LstItemGaleryApiProperty;
