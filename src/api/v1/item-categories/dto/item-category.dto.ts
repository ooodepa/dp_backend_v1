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
  @ApiProperty(ItemCategoriesApiProperty.dp_name)
  dp_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty(ItemCategoriesApiProperty.dp_urlSegment)
  dp_urlSegment: string;

  @IsString()
  @ApiProperty(ItemCategoriesApiProperty.dp_photoUrl)
  dp_photoUrl: string;

  @IsNumber()
  @ApiProperty(ItemCategoriesApiProperty.dp_sortingIndex)
  dp_sortingIndex: number;

  @IsString()
  @ApiProperty(ItemCategoriesApiProperty.dp_seoKeywords)
  dp_seoKeywords: string;

  @IsString()
  @ApiProperty(ItemCategoriesApiProperty.dp_seoDescription)
  dp_seoDescription: string;

  @IsBoolean()
  @ApiProperty(ItemCategoriesApiProperty.dp_isHidden)
  dp_isHidden: boolean;

  @IsOptional()
  @ApiProperty(ItemCategoriesApiProperty.dp_itemBrandId)
  dp_itemBrandId: number;
}
