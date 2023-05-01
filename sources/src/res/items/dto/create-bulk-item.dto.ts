import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray } from 'class-validator';

import ItemNoIdDto from './item-no-id.dto';

export class CreateBulkItemDto {
  @ApiProperty({ type: [ItemNoIdDto] })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ItemNoIdDto)
  bulk: [ItemNoIdDto];
}
