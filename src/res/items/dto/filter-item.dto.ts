import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class FilterItemDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  dp_itemCategoryId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  dp_model: string;

  @ApiProperty({ required: false, default: 'dp-accessories' })
  @IsOptional()
  @IsString()
  category: string;
}
