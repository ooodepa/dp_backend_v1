import { ApiPropertyOptions } from '@nestjs/swagger';

interface IProps {
  dp_id: ApiPropertyOptions;
  dp_helperId: ApiPropertyOptions;
  dp_contactTypeId: ApiPropertyOptions;
  dp_value: ApiPropertyOptions;
  dp_isHidden: ApiPropertyOptions;
}

const HelperContactTypesApiProperty: IProps = {
  dp_id: {
    example: 1,
  },
  dp_helperId: {
    example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  },
  dp_contactTypeId: {
    example: 1,
  },
  dp_value: {
    example: '+111223334455',
  },
  dp_isHidden: {
    example: false,
  },
};

export default HelperContactTypesApiProperty;
