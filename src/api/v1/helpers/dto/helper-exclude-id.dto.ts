import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator';

import HelperDto from './helper.dto';
import HelpersApiProperty from '../helpers.swagger';
import HelperContactTypesApiProperty from '../helperContactTypes.swagger';

class HelperContactTypeExcludeIdDto {
  @Exclude()
  dp_id: number;

  @Exclude()
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

export default class HelperExcludeIdDto extends HelperDto {
  @Exclude()
  dp_id: string;

  @IsArray()
  @Type(() => HelperContactTypeExcludeIdDto)
  @ApiProperty({
    ...HelpersApiProperty.dp_helperContactTypes,
    type: [HelperContactTypeExcludeIdDto],
  })
  dp_helperContactTypes: HelperContactTypeExcludeIdDto[];
}
