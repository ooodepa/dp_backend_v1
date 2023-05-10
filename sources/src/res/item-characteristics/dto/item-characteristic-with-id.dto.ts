import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import ItemCharacteristicDto from './item-characteristic.dto';
import ItemCharacteristicsApiProperty from '../item-characteristics.swagger';

export default class ItemCharacteristicWithIdDto extends ItemCharacteristicDto {
  @IsNumber()
  @ApiProperty(ItemCharacteristicsApiProperty.dp_id)
  dp_id: number;
}
