import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray } from 'class-validator';

import ItemBrandWithIdDto from './item-brand-with-id.dto';

export class UpdateBulkItemBrandDto {
  @ApiProperty({ type: [ItemBrandWithIdDto] })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ItemBrandWithIdDto)
  bulk: [ItemBrandWithIdDto];
}
