import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import ItemsApiProperty from '../items.swagger';

export default class ItemDto {
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

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  dp_isFolder: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty()
  dp_parentId: string;
}
