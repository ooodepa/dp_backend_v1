import { Exclude } from 'class-transformer';

import LstItemCharacteristicDto from './lst-item-characteristic';

export default class LstItemCharacteristicNoIdDto extends LstItemCharacteristicDto {
  @Exclude()
  dp_id: number;

  @Exclude()
  dp_itemId: string;
}
