import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

import LstItemCharacteristicsApiProperty from '../lst-item-characteristics.swagger';

export default class LstItemCharacteristicNoIdDto {
  @Exclude()
  dp_id: number;

  @Exclude()
  dp_itemId: string;

  @IsNumber()
  @ApiProperty(LstItemCharacteristicsApiProperty.dp_characteristicId)
  dp_characteristicId: number;

  @IsString()
  @ApiProperty(LstItemCharacteristicsApiProperty.dp_value)
  dp_value: string;
}
