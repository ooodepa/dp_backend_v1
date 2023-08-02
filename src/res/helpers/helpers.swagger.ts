import { ApiPropertyOptions } from '@nestjs/swagger';

interface IProps {
  dp_id: ApiPropertyOptions;
  dp_name: ApiPropertyOptions;
  dp_text: ApiPropertyOptions;
  dp_sortingIndex: ApiPropertyOptions;
  dp_isHidden: ApiPropertyOptions;
  dp_helperContactTypes: ApiPropertyOptions;
}

const HelpersApiProperty: IProps = {
  dp_id: {
    example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  },
  dp_name: {
    example: 'Директор',
  },
  dp_text: {
    example: 'текст',
  },
  dp_sortingIndex: {
    example: 10000,
  },
  dp_isHidden: {
    example: false,
  },
  dp_helperContactTypes: {
    // example: [],
  },
};

export default HelpersApiProperty;
