import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import ItemBrandsApiProperty from '../item-brands.swagger';

export default class ItemBrandDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiProperty(ItemBrandsApiProperty.dp_name)
  dp_seoTitle: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiProperty(ItemBrandsApiProperty.dp_seoDescription)
  dp_seoDescription: string;

  @IsString()
  @IsOptional()
  @ApiProperty(ItemBrandsApiProperty.dp_seoKeywords)
  dp_seoKeywords: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiProperty(ItemBrandsApiProperty.dp_urlSegment)
  dp_seoUrlSegment: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  dp_photos: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  dp_photos360: string;

  @IsString()
  @IsOptional()
  @ApiProperty(ItemBrandsApiProperty.dp_photoUrl)
  dp_photoUrl: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty(ItemBrandsApiProperty.dp_sortingIndex)
  dp_sortingIndex: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  dp_youtubeIds: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty(ItemBrandsApiProperty.dp_isHidden)
  dp_isHidden: boolean;
}
