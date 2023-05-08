import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import ContactTypeNoId from './contact-type-no-id.dto';
import ContactTypesApiProperty from '../contact-types.swagger';

export default class ContactTypeWithId extends ContactTypeNoId {
  @IsNumber()
  @ApiProperty(ContactTypesApiProperty.dp_id)
  dp_id: number;
}
