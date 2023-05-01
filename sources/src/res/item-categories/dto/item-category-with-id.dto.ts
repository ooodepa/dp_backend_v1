import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import ItemCategoryDto from './item-category.dto';
import ItemCategoryApiProperty from '../item-category-api-property';

export default class ItemCategoryWithIdDto extends ItemCategoryDto {
  @IsNumber()
  @ApiProperty(ItemCategoryApiProperty.dp_id)
  dp_id: number;
}
