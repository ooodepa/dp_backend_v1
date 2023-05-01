import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray } from 'class-validator';

import ItemWithIdDto from './item-with-id.dto';

export class UpdateBulkItemDto {
  @ApiProperty({ type: [ItemWithIdDto] })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ItemWithIdDto)
  bulk: [ItemWithIdDto];
}
