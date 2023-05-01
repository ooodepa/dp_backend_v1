import { Exclude } from 'class-transformer';

import ItemCategoryDto from './item-category.dto';

export default class ItemCategoryNoIdDto extends ItemCategoryDto {
  @Exclude()
  dp_id: number;
}
