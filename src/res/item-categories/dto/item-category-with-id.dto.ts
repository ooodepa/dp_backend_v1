import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import ItemCategoryDto from './item-category.dto';
import ItemCategoriesApiProperty from '../item-categories.swagger';

export default class ItemCategoryWithIdDto extends ItemCategoryDto {
  @IsNumber()
  @ApiProperty(ItemCategoriesApiProperty.dp_id)
  dp_id: number;
}
