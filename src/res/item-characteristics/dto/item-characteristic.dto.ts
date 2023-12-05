import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

import ItemCharacteristicsApiProperty from '../item-characteristics.swagger';

export default class ItemCharacteristicDto {
  @IsNumber()
  @ApiProperty(ItemCharacteristicsApiProperty.dp_sortingIndex)
  dp_sortingIndex: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty(ItemCharacteristicsApiProperty.dp_name)
  dp_name: string;

  @IsBoolean()
  @ApiProperty(ItemCharacteristicsApiProperty.dp_isHidden)
  dp_isHidden: boolean;
}
