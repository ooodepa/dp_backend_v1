import { ApiPropertyOptions } from '@nestjs/swagger';

interface IProps {
  dp_id: ApiPropertyOptions;
  dp_sortingIndex: ApiPropertyOptions;
  dp_name: ApiPropertyOptions;
  dp_unit: ApiPropertyOptions;
  dp_isHidden: ApiPropertyOptions;
}

const ItemCharacteristicsApiProperty: IProps = {
  dp_id: {
    example: 0,
  },
  dp_sortingIndex: {
    example: 0,
  },
  dp_name: {
    example: 'Высота',
  },
  dp_unit: {
    example: 'см',
  },
  dp_isHidden: {
    example: false,
  },
};

export default ItemCharacteristicsApiProperty;
