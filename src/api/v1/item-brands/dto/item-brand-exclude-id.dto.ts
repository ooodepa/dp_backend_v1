import { Exclude } from 'class-transformer';

import ItemBrandDto from './item-brand.dto';

export default class ItemBrandExcludeIdDto extends ItemBrandDto {
  @Exclude()
  dp_id: number;
}
