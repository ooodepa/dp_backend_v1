import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class FilterItemCategoryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  dp_itemBrandId?: string;

  @ApiProperty({ required: false, example: 'de-pa-electric' })
  @IsOptional()
  @IsString()
  brand?: string;
}
