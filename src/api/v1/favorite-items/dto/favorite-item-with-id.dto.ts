import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import FavoriteItemDto from './favorite-item.dto';
import FavoriteItemsApiProperty from '../favorite-items.swagger';

export default class FavoriteItemWithIdDto extends FavoriteItemDto {
  @IsNumber()
  @ApiProperty(FavoriteItemsApiProperty.dp_id)
  dp_id: number;
}
