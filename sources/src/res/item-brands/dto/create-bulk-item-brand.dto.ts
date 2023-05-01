import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray } from 'class-validator';

import ItemBrandNoIdDto from './item-brand-no-id.dto';

export class CreateBulkItemBrandDto {
  @ApiProperty({ type: [ItemBrandNoIdDto] })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ItemBrandNoIdDto)
  bulk: [ItemBrandNoIdDto];
}
