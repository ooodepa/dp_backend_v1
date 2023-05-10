import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';

import ItemsApiProperty from '../items.swagger';
import LstItemGaleryApiProperty from '../lst-item-galery.swagger';
import LstItemCharacteristicsApiProperty from '../lst-item-characteristics.swagger';

class LstItemCharacteristicExcludeIdDto {
  @Exclude()
  dp_id: number;

  @Exclude()
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

  @Exclude()
  dp_itemId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty(LstItemGaleryApiProperty.dp_photoUrl)
  dp_photoUrl: string;
}

export default class ItemExcludeIdDto {
  @Exclude()
  dp_id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty(ItemsApiProperty.dp_name)
  dp_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty(ItemsApiProperty.dp_model)
  dp_model: string;

  @IsNumber()
  @ApiProperty(ItemsApiProperty.dp_cost)
  dp_cost: number;

  @IsString()
  @ApiProperty(ItemsApiProperty.dp_photoUrl)
  dp_photoUrl: string;

  @IsNumber()
  @ApiProperty(ItemsApiProperty.dp_itemCategoryId)
  dp_itemCategoryId: number;

  @IsString()
  @ApiProperty(ItemsApiProperty.dp_seoKeywords)
  dp_seoKeywords: string;

  @IsString()
  @ApiProperty(ItemsApiProperty.dp_seoDescription)
  dp_seoDescription: string;

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
