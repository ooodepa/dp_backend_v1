import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray } from 'class-validator';

import ItemCategoryWithIdDto from './item-category-with-id.dto';

export class UpdateBulkItemCategoryDto {
  @ApiProperty({ type: [ItemCategoryWithIdDto] })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ItemCategoryWithIdDto)
  bulk: [ItemCategoryWithIdDto];
}
