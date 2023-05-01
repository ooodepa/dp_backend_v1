import { Exclude } from 'class-transformer';

import ItemCharacteristicDto from './item-characteristic.dto';

export default class ItemCharacteristicNoIdDto extends ItemCharacteristicDto {
  @Exclude()
  dp_id: number;
}
