import { ApiProperty } from '@nestjs/swagger';

import HelpersApiProperty from '../helpers.swagger';

export default class HelperDto {
  @ApiProperty(HelpersApiProperty.dp_name)
  dp_name: string;

  @ApiProperty(HelpersApiProperty.dp_text)
  dp_text: string;

  @ApiProperty(HelpersApiProperty.dp_sortingIndex)
  dp_sortingIndex: number;

  @ApiProperty(HelpersApiProperty.dp_isHidden)
  dp_isHidden: boolean;
}
