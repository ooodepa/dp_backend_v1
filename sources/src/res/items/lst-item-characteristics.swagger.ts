import { ApiPropertyOptions } from '@nestjs/swagger';

interface IProps {
  dp_id: ApiPropertyOptions;
  dp_itemId: ApiPropertyOptions;
  dp_characteristicId: ApiPropertyOptions;
  dp_value: ApiPropertyOptions;
}

const LstItemCharacteristicsApiProperty: IProps = {
  dp_id: {
    example: 1,
  },
  dp_itemId: {
    example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  },
  dp_characteristicId: {
    example: 1,
  },
  dp_value: {
    example: '12',
  },
};

export default LstItemCharacteristicsApiProperty;
