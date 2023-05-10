import { Exclude } from 'class-transformer';

import ItemCharacteristicDto from './item-characteristic.dto';

export default class ItemCharacteristicExcludeIdDto extends ItemCharacteristicDto {
  @Exclude()
  dp_id: number;
}
