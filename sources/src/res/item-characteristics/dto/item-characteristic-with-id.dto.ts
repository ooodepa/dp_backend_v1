import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

import ItemCharacteristicDto from './item-characteristic.dto';
import ItemCharacteristicsApiProperty from '../item-characteristics-api-property';

export default class ItemCharacteristicWithIdDto extends ItemCharacteristicDto {
  @IsNumber()
  @ApiProperty(ItemCharacteristicsApiProperty.dp_id)
  dp_id: number;
}
