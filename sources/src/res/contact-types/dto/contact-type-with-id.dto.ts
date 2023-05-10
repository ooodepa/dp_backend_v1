import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import ContactTypeDto from './contact-type.dto';
import ContactTypesApiProperty from '../contact-types.swagger';

export default class ContactTypeWithIdDto extends ContactTypeDto {
  @IsNumber()
  @ApiProperty(ContactTypesApiProperty.dp_id)
  dp_id: number;
}
