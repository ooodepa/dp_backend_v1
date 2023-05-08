import { Type } from 'class-transformer';
import { IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import HelperNoId from './helper-no-id.dto';
import HelpersApiProperty from '../helpers.swagger';
import HelperContactTypeWithId from './helper-contact-type-with-id.dto';

export default class HelperWithId extends HelperNoId {
  @ApiProperty(HelpersApiProperty.dp_id)
  dp_id: string;

  @IsArray()
  @Type(() => HelperContactTypeWithId)
  @ApiProperty({
    ...HelpersApiProperty.dp_helperContactTypes,
    type: [HelperContactTypeWithId],
  })
  dp_helperContactTypes: HelperContactTypeWithId[];
}
