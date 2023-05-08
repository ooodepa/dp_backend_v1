import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import ItemNoIdDto from './item-no-id.dto';
import ItemsApiProperty from '../items.swagger';
import LstItemGaleryWithIdDto from './lst-item-galery-with-id.dto';
import LstItemCharacteristicWithIdDto from './lst-item-characteristic-with-id.dto';

export default class ItemWithIdDto extends ItemNoIdDto {
  @IsNotEmpty()
  @IsUUID()
  @IsString()
  @ApiProperty(ItemsApiProperty.dp_id)
  dp_id: string;

  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(0)
  @ValidateNested({ each: true })
  @Type(() => LstItemCharacteristicWithIdDto)
  @ApiProperty({ type: [LstItemCharacteristicWithIdDto] })
  dp_itemCharacteristics: LstItemCharacteristicWithIdDto[];

  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(0)
  @ValidateNested({ each: true })
  @Type(() => LstItemGaleryWithIdDto)
  @ApiProperty({ type: [LstItemGaleryWithIdDto] })
  dp_itemGalery: LstItemGaleryWithIdDto[];
}
