import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray } from 'class-validator';

import ItemCategoryExcludeIdDto from './item-category-exclude-id.dto';

export class CreateBulkItemCategoryDto {
  @ApiProperty({ type: [ItemCategoryExcludeIdDto] })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ItemCategoryExcludeIdDto)
  bulk: [ItemCategoryExcludeIdDto];
}
