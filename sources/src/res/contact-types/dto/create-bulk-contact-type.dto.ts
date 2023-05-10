import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray } from 'class-validator';
import ContactTypeExcludeIdDto from './contact-type-exclude-id.dto';

export class CreateBulkContactTypeDto {
  @ApiProperty({ type: [ContactTypeExcludeIdDto] })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ContactTypeExcludeIdDto)
  bulk: [ContactTypeExcludeIdDto];
}
