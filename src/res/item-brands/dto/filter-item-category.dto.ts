import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FilterItemBrandDto {
  @ApiProperty({
    required: false,
    example: 'xml',
    description: 'Например: `xml`, `json`.',
  })
  @IsOptional()
  @IsString()
  format: 'json' | 'xml' | string;
}
