import { ApiPropertyOptions } from '@nestjs/swagger';

interface IProps {
  dp_id: ApiPropertyOptions;
  dp_itemId: ApiPropertyOptions;
  dp_userId: ApiPropertyOptions;
}

const LstItemCharacteristicsApiProperty: IProps = {
  dp_id: {
    example: 1,
  },
  dp_itemId: {
    example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  },
  dp_userId: {
    example: 1,
  },
};

export default LstItemCharacteristicsApiProperty;
