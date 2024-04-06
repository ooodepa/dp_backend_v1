import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class FilterItemDto {
  @ApiProperty({
    required: false,
    description: 'Например: `1`, `2`, `3`...',
  })
  @IsOptional()
  @IsNumberString()
  dp_itemCategoryId: string;

  @ApiProperty({
    required: false,
    description: 'Например: `10012`...',
  })
  @IsOptional()
  @IsString()
  dp_model: string;

  @ApiProperty({
    required: false,
    description: 'Например: `dp-accessories`...',
  })
  @IsOptional()
  @IsString()
  category: string;

  @ApiProperty({
    required: false,
    example: 'de-pa-electric',
    description: 'Например: `de-pa-electric`, `mono-electric`, `mega`...',
  })
  @IsOptional()
  @IsString()
  brand: string;
}
