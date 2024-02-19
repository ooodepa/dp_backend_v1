import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import HelperDto from './helper.dto';
import HelpersApiProperty from '../helpers.swagger';
import HelperContactTypesApiProperty from '../helperContactTypes.swagger';

class HelperContactTypeWithIdDto {
  @IsNumber()
  @ApiProperty(HelperContactTypesApiProperty.dp_id)
  dp_id: number;

  @IsString()
  @ApiProperty(HelperContactTypesApiProperty.dp_helperId)
  dp_helperId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty(HelperContactTypesApiProperty.dp_contactTypeId)
  dp_contactTypeId: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty(HelperContactTypesApiProperty.dp_value)
  dp_value: string;

  @IsBoolean()
  @ApiProperty(HelperContactTypesApiProperty.dp_isHidden)
  dp_isHidden: boolean;
}

export default class HelperWithIdDto extends HelperDto {
  @ApiProperty(HelpersApiProperty.dp_id)
  dp_id: string;

  @IsArray()
  @Type(() => HelperContactTypeWithIdDto)
  @ApiProperty({
    ...HelpersApiProperty.dp_helperContactTypes,
    type: [HelperContactTypeWithIdDto],
  })
  dp_helperContactTypes: HelperContactTypeWithIdDto[];
}
