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
  @IsString()
  @IsOptional()
  @ApiProperty()
  dp_1cCode: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  dp_1cDescription: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  dp_1cIsFolder: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty()
  dp_1cParentId: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiProperty(ItemsApiProperty.dp_name)
  dp_seoTitle: string;

  @IsString()
  @IsOptional()
  @ApiProperty(ItemsApiProperty.dp_seoDescription)
  dp_seoDescription: string;

  @IsString()
  @IsOptional()
  @ApiProperty(ItemsApiProperty.dp_seoKeywords)
  dp_seoKeywords: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiProperty(ItemsApiProperty.dp_model)
  dp_seoUrlSegment: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  dp_textCharacteristics: string;

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
  @ApiProperty(ItemsApiProperty.dp_photoUrl)
  dp_photoUrl: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  dp_wholesaleQuantity: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  dp_brand: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  dp_combinedName: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  dp_vendorIds: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  dp_barcodes: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  dp_length: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  dp_width: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  dp_height: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  dp_weight: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty(ItemsApiProperty.dp_cost)
  dp_cost: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  dp_currancy: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  dp_sortingIndex: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  dp_youtubeIds: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  dp_isHidden: boolean;

  @IsNumber()
  @IsOptional()
  @ApiProperty(ItemsApiProperty.dp_itemCategoryId)
  dp_itemCategoryId: number;
}
