import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import ItemCharacteristicsApiProperty from '../item-characteristics-api-property';

export default class ItemCharacteristicDto {
  dp_id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty(ItemCharacteristicsApiProperty.dp_name)
  dp_name: string;
}
