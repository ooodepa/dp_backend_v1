import { Exclude } from 'class-transformer';

import ItemCategoryDto from './item-category.dto';

export default class ItemCategoryExcludeIdDto extends ItemCategoryDto {
  @Exclude()
  dp_id: number;
}
