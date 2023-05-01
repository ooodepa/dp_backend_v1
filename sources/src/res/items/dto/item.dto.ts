import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

import ItemsApiProperty from '../items-api-property';
import LstItemGaleryDto from './lst-item-galery';
import LstItemCharacteristicDto from './lst-item-characteristic';

export default class ItemDto {
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

  @ApiProperty({ type: [LstItemCharacteristicDto] })
  dp_itemCharecteristics: LstItemCharacteristicDto[];

  @ApiProperty({ type: [LstItemGaleryDto] })
  dp_itemGalery: LstItemGaleryDto[];
}
