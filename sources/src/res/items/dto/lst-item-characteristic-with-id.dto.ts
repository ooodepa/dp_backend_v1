import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

import LstItemCharacteristicDto from './lst-item-characteristic';
import LstItemCharacteristicsApiProperty from '../lst-item-galery-api-property.dto';

export default class LstItemCharacteristicWithIdDto extends LstItemCharacteristicDto {
  @IsNumber()
  @ApiProperty(LstItemCharacteristicsApiProperty.dp_id)
  dp_id: number;

  @IsNotEmpty()
  @IsUUID()
  @IsString()
  @ApiProperty(LstItemCharacteristicsApiProperty.dp_itemId)
  dp_itemId: string;
}
