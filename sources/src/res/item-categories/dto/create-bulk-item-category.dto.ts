import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray } from 'class-validator';

import ItemCategoryNoIdDto from './item-category-no-id.dto';

export class CreateBulkItemCategoryDto {
  @ApiProperty({ type: [ItemCategoryNoIdDto] })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ItemCategoryNoIdDto)
  bulk: [ItemCategoryNoIdDto];
}
