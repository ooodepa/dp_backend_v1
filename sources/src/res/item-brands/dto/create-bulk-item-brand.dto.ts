import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray } from 'class-validator';

import ItemBrandExcludeIdDto from './item-brand-exclude-id.dto';

export class CreateBulkItemBrandDto {
  @ApiProperty({ type: [ItemBrandExcludeIdDto] })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ItemBrandExcludeIdDto)
  bulk: [ItemBrandExcludeIdDto];
}
