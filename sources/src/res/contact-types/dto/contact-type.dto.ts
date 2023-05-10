import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

import ContactTypesApiProperty from '../contact-types.swagger';

export default class ContactTypeDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty(ContactTypesApiProperty.dp_name)
  dp_name: string;

  @IsBoolean()
  @ApiProperty(ContactTypesApiProperty.dp_isHidden)
  dp_isHidden: boolean;
}
