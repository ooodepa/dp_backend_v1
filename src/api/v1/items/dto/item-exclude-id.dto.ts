import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';

import ItemDto from './item.dto';
import LstItemGaleryApiProperty from '../lst-item-galery.swagger';
import LstItemCharacteristicsApiProperty from '../lst-item-characteristics.swagger';

class LstItemCharacteristicExcludeIdDto {
  @Exclude()
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

class LstItemGaleryExcludeIdDto {
  @Exclude()
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

export default class ItemExcludeIdDto extends ItemDto {
  @Exclude()
  dp_id: string;

  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(0)
  @ValidateNested({ each: true })
  @Type(() => LstItemCharacteristicExcludeIdDto)
  @ApiProperty({ type: [LstItemCharacteristicExcludeIdDto] })
  dp_itemCharacteristics: LstItemCharacteristicExcludeIdDto[];

  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(0)
  @ValidateNested({ each: true })
  @Type(() => LstItemGaleryExcludeIdDto)
  @ApiProperty({ type: [LstItemGaleryExcludeIdDto] })
  dp_itemGalery: LstItemGaleryExcludeIdDto[];
}
