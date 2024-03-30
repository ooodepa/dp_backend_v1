import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import ItemCategoriesApiProperty from '../item-categories.swagger';

export default class ItemCategoryDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiProperty(ItemCategoriesApiProperty.dp_name)
  dp_seoTitle: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiProperty(ItemCategoriesApiProperty.dp_seoDescription)
  dp_seoDescription: string;

  @IsString()
  @IsOptional()
  @ApiProperty(ItemCategoriesApiProperty.dp_seoKeywords)
  dp_seoKeywords: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiProperty(ItemCategoriesApiProperty.dp_urlSegment)
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
  @ApiProperty(ItemCategoriesApiProperty.dp_photoUrl)
  dp_photoUrl: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty(ItemCategoriesApiProperty.dp_sortingIndex)
  dp_sortingIndex: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  dp_youtubeIds: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty(ItemCategoriesApiProperty.dp_isHidden)
  dp_isHidden: boolean;

  @IsNumber()
  @IsOptional()
  @ApiProperty(ItemCategoriesApiProperty.dp_itemBrandId)
  dp_itemBrandId: number;
}
