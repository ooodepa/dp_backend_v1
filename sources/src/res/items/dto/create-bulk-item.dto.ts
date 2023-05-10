import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray } from 'class-validator';

import ItemExcludeIdDto from './item-exclude-id.dto';

export class CreateBulkItemDto {
  @ApiProperty({ type: [ItemExcludeIdDto] })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ItemExcludeIdDto)
  bulk: [ItemExcludeIdDto];
}
