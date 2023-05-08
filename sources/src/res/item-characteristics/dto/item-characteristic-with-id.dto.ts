import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import ItemCharacteristicNoIdDto from './item-characteristic-no-id.dto';
import ItemCharacteristicsApiProperty from '../item-characteristics.swagger';

export default class ItemCharacteristicWithIdDto extends ItemCharacteristicNoIdDto {
  @IsNumber()
  @ApiProperty(ItemCharacteristicsApiProperty.dp_id)
  dp_id: number;
}
