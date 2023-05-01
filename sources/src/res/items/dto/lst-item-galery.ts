import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

import LstItemCharacteristicsApiProperty from '../lst-item-galery-api-property.dto';

export default class LstItemGaleryDto {
  dp_id: number;

  dp_itemId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty(LstItemCharacteristicsApiProperty.dp_photoUrl)
  dp_photoUrl: string;
}
