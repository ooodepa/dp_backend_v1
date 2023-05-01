import { Exclude } from 'class-transformer';

import LstItemGaleryDto from './lst-item-galery';

export default class LstItemGaleryNoIdDto extends LstItemGaleryDto {
  @Exclude()
  dp_id: number;

  @Exclude()
  dp_itemId: string;
}
