import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import ItemCategoryNoIdDto from './item-category-no-id.dto';
import ItemCategoriesApiProperty from '../item-categories.swagger';

export default class ItemCategoryWithIdDto extends ItemCategoryNoIdDto {
  @IsNumber()
  @ApiProperty(ItemCategoriesApiProperty.dp_id)
  dp_id: number;
}
