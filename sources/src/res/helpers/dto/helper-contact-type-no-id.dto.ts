import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

import HelperContactTypesApiProperty from '../helperContactTypes.swagger';

export default class HelperContactTypeNoId {
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
