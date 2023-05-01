import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray } from 'class-validator';

import { ContactTypeCreateDto } from './create-contact-type.dto';

export class ContactTypeCreateBulkDto {
  @ApiProperty({ type: [ContactTypeCreateDto] })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ContactTypeCreateDto)
  bulk: [ContactTypeCreateDto];
}
