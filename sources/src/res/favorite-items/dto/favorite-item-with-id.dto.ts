import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import FavoriteItemNoId from './favorite-item-no-id.dto';
import FavoriteItemsApiProperty from '../favorite-items.swagger';

export default class FavoriteItemWithId extends FavoriteItemNoId {
  @IsNumber()
  @ApiProperty(FavoriteItemsApiProperty.dp_id)
  dp_id: number;
}
