import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

import FavoriteItemsApiProperty from '../favorite-items.swagger';

export default class FavoriteItemDto {
  @IsNumber()
  @ApiProperty(FavoriteItemsApiProperty.dp_userId)
  dp_userId: number;

  @IsUUID()
  @IsNotEmpty()
  @IsString()
  @ApiProperty(FavoriteItemsApiProperty.dp_itemId)
  dp_itemId: string;
}
