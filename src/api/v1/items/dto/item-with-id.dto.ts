import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import ItemDto from './item.dto';
import ItemsApiProperty from '../items.swagger';
import LstItemGaleryApiProperty from '../lst-item-galery.swagger';
import LstItemCharacteristicsApiProperty from '../lst-item-characteristics.swagger';

class LstItemCharacteristicWithIdDto {
  @IsNumber()
  @ApiProperty(LstItemCharacteristicsApiProperty.dp_id)
  dp_id: number;

  @IsUUID()
  @IsNotEmpty()
  @IsString()
  @ApiProperty(LstItemCharacteristicsApiProperty.dp_itemId)
  dp_itemId: string;

  @IsNumber()
  @ApiProperty(LstItemCharacteristicsApiProperty.dp_characteristicId)
  dp_characteristicId: number;

  @IsString()
  @ApiProperty(LstItemCharacteristicsApiProperty.dp_value)
  dp_value: string;
}

class LstItemGaleryWithIdDto {
  @IsNumber()
  @ApiProperty(LstItemGaleryApiProperty.dp_id)
  dp_id: number;

  @IsNotEmpty()
  @IsUUID()
  @IsString()
  @ApiProperty(LstItemGaleryApiProperty.dp_itemId)
  dp_itemId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty(LstItemGaleryApiProperty.dp_photoUrl)
  dp_photoUrl: string;
}

export default class ItemWithIdDto extends ItemDto {
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
