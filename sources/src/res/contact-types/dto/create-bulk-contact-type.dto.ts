import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray } from 'class-validator';

import { CreateContactTypeDto } from './create-contact-type.dto';

export class CreateBulkContactTypeDto {
  @ApiProperty({ type: [CreateContactTypeDto] })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => CreateContactTypeDto)
  bulk: [CreateContactTypeDto];
}
