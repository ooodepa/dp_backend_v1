import { ApiPropertyOptions } from '@nestjs/swagger';

interface IProps {
  dp_id: ApiPropertyOptions;
  dp_name: ApiPropertyOptions;
  dp_isHidden: ApiPropertyOptions;
}

const ItemCharacteristicsApiProperty: IProps = {
  dp_id: {
    example: 0,
  },
  dp_name: {
    example: 'В коробке',
  },
  dp_isHidden: {
    example: false,
  },
};

export default ItemCharacteristicsApiProperty;
