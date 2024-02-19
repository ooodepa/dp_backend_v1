import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

import ItemBrandsApiProperty from '../item-brands.swagger';

export default class ItemBrandDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty(ItemBrandsApiProperty.dp_name)
  dp_name: string;

  @IsString()
  @ApiProperty(ItemBrandsApiProperty.dp_photoUrl)
  dp_photoUrl: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty(ItemBrandsApiProperty.dp_urlSegment)
  dp_urlSegment: string;

  @IsNumber()
  @ApiProperty(ItemBrandsApiProperty.dp_sortingIndex)
  dp_sortingIndex: number;

  @IsString()
  @ApiProperty(ItemBrandsApiProperty.dp_seoKeywords)
  dp_seoKeywords: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty(ItemBrandsApiProperty.dp_seoDescription)
  dp_seoDescription: string;

  @IsBoolean()
  @ApiProperty(ItemBrandsApiProperty.dp_isHidden)
  dp_isHidden: boolean;
}
