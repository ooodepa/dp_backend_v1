import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Exclude } from 'class-transformer';
import ItemsApiProperty from '../items.swagger';
import LstItemGaleryApiProperty from '../lst-item-galery.swagger';
import LstItemCharacteristicsApiProperty from '../lst-item-characteristics.swagger';

export default class ItemDto {
  dp_id: string;

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
  dp_markdown: string;

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
  dp_ozonIds: string;

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

  dp_itemCharacteristics: LstItemCharacteristicDto[];
  dp_itemGalery: LstItemGaleryDto[];
}

class LstItemCharacteristicDto {
  @Exclude()
  dp_id: number;

  @IsUUID()
  @IsNotEmpty()
  @IsString()
  @ApiProperty(LstItemCharacteristicsApiProperty.dp_itemId)
  dp_itemId: string;

  @IsNumber()
  @ApiProperty(LstItemCharacteristicsApiProperty.dp_characteristicId)
  dp_characteristicId: number;

  @IsString()
  @ApiProperty(LstItemCharacteristicsApiProperty.dp_value)
  dp_value: string;
}

class LstItemGaleryDto {
  @Exclude()
  dp_id: number;

  @IsNotEmpty()
  @IsUUID()
  @IsString()
  @ApiProperty(LstItemGaleryApiProperty.dp_itemId)
  dp_itemId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty(LstItemGaleryApiProperty.dp_photoUrl)
  dp_photoUrl: string;
}
