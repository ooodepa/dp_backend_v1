import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import ItemDto from './item.dto';
import LstItemGaleryNoIdDto from './lst-item-galery-no-id.dto';
import LstItemCharacteristicNoIdDto from './lst-item-characteristic-no-id.dto';

export default class ItemNoIdDto extends ItemDto {
  @Exclude()
  dp_id: string;

  @ApiProperty({ type: [LstItemCharacteristicNoIdDto] })
  dp_itemCharecteristics: LstItemCharacteristicNoIdDto[];

  @ApiProperty({ type: [LstItemGaleryNoIdDto] })
  dp_itemGalery: LstItemGaleryNoIdDto[];
}
