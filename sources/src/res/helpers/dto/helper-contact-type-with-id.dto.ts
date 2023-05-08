import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

import HelperContactTypeNoId from './helper-contact-type-no-id.dto';
import HelperContactTypesApiProperty from '../helperContactTypes.swagger';

export default class HelperContactTypeWithId extends HelperContactTypeNoId {
  @IsNumber()
  @ApiProperty(HelperContactTypesApiProperty.dp_id)
  dp_id: number;

  @IsString()
  @ApiProperty(HelperContactTypesApiProperty.dp_helperId)
  dp_helperId: string;
}
