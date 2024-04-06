import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class FilterItemCategoryDto {
  @ApiProperty({
    required: false,
    description: 'Например: `1`, `2`, `3` ...',
  })
  @IsOptional()
  @IsNumberString()
  dp_itemBrandId?: string;

  @ApiProperty({
    required: false,
    example: 'de-pa-electric',
    description: 'Например: `de-pa-electric`, `mono-electric`, `mega`...',
  })
  @IsOptional()
  @IsString()
  brand?: string;
}
