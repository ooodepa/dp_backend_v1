import { Exclude } from 'class-transformer';

import FavoriteItemDto from './favorite-item.dto';

export default class FavoriteItemExcludeIdDto extends FavoriteItemDto {
  @Exclude()
  dp_id: number;
}
