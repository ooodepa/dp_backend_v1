import { ApiProperty } from '@nestjs/swagger';

import ItemCategoryApiProperty from '../item-category-api-property';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export default class ItemCategoryDto {
  dp_id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty(ItemCategoryApiProperty.dp_name)
  dp_name: string;

  @IsNumber()
  @ApiProperty(ItemCategoryApiProperty.dp_sortingIndex)
  dp_sortingIndex: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty(ItemCategoryApiProperty.dp_urlSegment)
  dp_urlSegment: string;

  @IsString()
  @ApiProperty(ItemCategoryApiProperty.dp_photoUrl)
  dp_photoUrl: string;

  @IsString()
  @ApiProperty(ItemCategoryApiProperty.dp_seoKeywords)
  dp_seoKeywords: string;

  @IsString()
  @ApiProperty(ItemCategoryApiProperty.dp_seoDescription)
  dp_seoDescription: string;

  @IsBoolean()
  @ApiProperty(ItemCategoryApiProperty.dp_isHidden)
  dp_isHidden: boolean;

  @IsOptional()
  @ApiProperty(ItemCategoryApiProperty.dp_itemBrandId)
  dp_itemBrandId: number;
}
