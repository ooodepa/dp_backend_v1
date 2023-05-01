import { ApiProperty } from '@nestjs/swagger';

export default class GetFavoriteItemDto {
  @ApiProperty({ example: 0 })
  dp_id: number;

  @ApiProperty({ example: 0 })
  dp_userId: number;

  @ApiProperty({ example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' })
  dp_itemId: string;
}
