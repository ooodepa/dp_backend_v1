import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import LstItemGaleryApiProperty from '../lst-item-galery.swagger';

export default class LstItemGaleryNoIdDto {
  @Exclude()
  dp_id: number;

  @Exclude()
  dp_itemId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty(LstItemGaleryApiProperty.dp_photoUrl)
  dp_photoUrl: string;
}
