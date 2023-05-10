import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

import ItemCharacteristicsApiProperty from '../item-characteristics.swagger';

export default class ItemCharacteristicDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty(ItemCharacteristicsApiProperty.dp_name)
  dp_name: string;

  @IsBoolean()
  @ApiProperty(ItemCharacteristicsApiProperty.dp_isHidden)
  dp_isHidden: boolean;
}
