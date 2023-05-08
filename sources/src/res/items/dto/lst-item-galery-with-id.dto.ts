import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

import LstItemGaleryNoIdDto from './lst-item-galery-no-id.dto';
import LstItemGaleryApiProperty from '../lst-item-galery.swagger';

export default class LstItemGaleryWithIdDto extends LstItemGaleryNoIdDto {
  @IsNumber()
  @ApiProperty(LstItemGaleryApiProperty.dp_id)
  dp_id: number;

  @IsNotEmpty()
  @IsUUID()
  @IsString()
  @ApiProperty(LstItemGaleryApiProperty.dp_itemId)
  dp_itemId: string;
}
