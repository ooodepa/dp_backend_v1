import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

import FavoriteItemsApiProperty from '../favorite-items.swagger';

export default class FavoriteItemNoId {
  @Exclude()
  dp_id: number;

  @IsNumber()
  @ApiProperty(FavoriteItemsApiProperty.dp_userId)
  dp_userId: number;

  @IsUUID()
  @IsNotEmpty()
  @IsString()
  @ApiProperty(FavoriteItemsApiProperty.dp_itemId)
  dp_itemId: string;
}
