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
import LstItemGaleryNoIdDto from './lst-item-galery-no-id.dto';
import LstItemCharacteristicNoIdDto from './lst-item-characteristic-no-id.dto';

export default class ItemNoIdDto {
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
  @Type(() => LstItemCharacteristicNoIdDto)
  @ApiProperty({ type: [LstItemCharacteristicNoIdDto] })
  dp_itemCharacteristics: LstItemCharacteristicNoIdDto[];

  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(0)
  @ValidateNested({ each: true })
  @Type(() => LstItemGaleryNoIdDto)
  @ApiProperty({ type: [LstItemGaleryNoIdDto] })
  dp_itemGalery: LstItemGaleryNoIdDto[];
}
