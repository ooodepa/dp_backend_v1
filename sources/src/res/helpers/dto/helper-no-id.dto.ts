import { IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';

import HelpersApiProperty from '../helpers.swagger';
import HelperContactTypeNoId from './helper-contact-type-no-id.dto';

export default class HelperNoId {
  @Exclude()
  dp_id: string;

  @ApiProperty(HelpersApiProperty.dp_name)
  dp_name: string;

  @ApiProperty(HelpersApiProperty.dp_text)
  dp_text: string;

  @ApiProperty(HelpersApiProperty.dp_sortingIndex)
  dp_sortingIndex: number;

  @ApiProperty(HelpersApiProperty.dp_isHidden)
  dp_isHidden: boolean;

  @IsArray()
  @Type(() => HelperContactTypeNoId)
  @ApiProperty({
    ...HelpersApiProperty.dp_helperContactTypes,
    type: [HelperContactTypeNoId],
  })
  dp_helperContactTypes: HelperContactTypeNoId[];
}
