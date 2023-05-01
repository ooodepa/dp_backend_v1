import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

import ItemBrandApiProperty from '../item-brands-api-property';

export default class ItemBrandDto {
  dp_id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty(ItemBrandApiProperty.dp_name)
  dp_name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty(ItemBrandApiProperty.dp_sortingIndex)
  dp_sortingIndex: number;

  @IsString()
  @ApiProperty(ItemBrandApiProperty.dp_photoUrl)
  dp_photoUrl: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty(ItemBrandApiProperty.dp_urlSegment)
  dp_urlSegment: string;

  @IsString()
  @ApiProperty(ItemBrandApiProperty.dp_seoKeywords)
  dp_seoKeywords: string;

  @IsString()
  @ApiProperty(ItemBrandApiProperty.dp_seoDescription)
  dp_seoDescription: string;

  @IsBoolean()
  @ApiProperty(ItemBrandApiProperty.dp_isHidden)
  dp_isHidden: boolean;
}
