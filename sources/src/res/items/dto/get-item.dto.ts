import { ApiProperty } from '@nestjs/swagger';

import GetItemShortDto from './get-item-short.dto';
import LstItemGaleryWithIdDto from './lst-item-galery-with-id.dto';
import LstItemCharacteristicWithIdDto from './lst-item-characteristic-with-id.dto';

export default class GetItemDto extends GetItemShortDto {
  @ApiProperty({ type: [LstItemCharacteristicWithIdDto] })
  dp_itemCharecteristics: LstItemCharacteristicWithIdDto[];

  @ApiProperty({ type: [LstItemGaleryWithIdDto] })
  dp_itemGalery: LstItemGaleryWithIdDto[];
}
