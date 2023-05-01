import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

import ItemDto from './item.dto';
import ItemsApiProperty from '../items-api-property';
import LstItemGaleryNoIdDto from './lst-item-galery-no-id.dto';
import LstItemCharacteristicNoIdDto from './lst-item-characteristic-no-id.dto';

export default class ItemWithIdDto extends ItemDto {
  @IsNotEmpty()
  @IsUUID()
  @IsString()
  @ApiProperty(ItemsApiProperty.dp_id)
  dp_id: string;

  @ApiProperty({ type: [LstItemCharacteristicNoIdDto] })
  dp_itemCharecteristics: LstItemCharacteristicNoIdDto[];

  @ApiProperty({ type: [LstItemGaleryNoIdDto] })
  dp_itemGalery: LstItemGaleryNoIdDto[];
}
