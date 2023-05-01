import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

import LstItemGaleryDto from './lst-item-galery';
import LstItemGaleryApiProperty from '../lst-item-galery-api-property.dto';

export default class LstItemGaleryWithIdDto extends LstItemGaleryDto {
  @IsNumber()
  @ApiProperty(LstItemGaleryApiProperty.dp_id)
  dp_id: number;

  @IsNotEmpty()
  @IsUUID()
  @IsString()
  @ApiProperty(LstItemGaleryApiProperty.dp_itemId)
  dp_itemId: string;
}
