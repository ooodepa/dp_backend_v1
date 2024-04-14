import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

enum FolderValue {
  Folder = 1,
  NotFolder = 0,
}

export class FilterItemDto {
  @ApiProperty({
    required: false,
    description: 'Например: `1`',
  })
  @IsOptional()
  @IsNumberString()
  dp_itemCategoryId: string;

  @ApiProperty({
    required: false,
    description: 'Например: `10012`',
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
    description: 'Например: `de-pa-electric`',
  })
  @IsOptional()
  @IsString()
  brand: string;

  @ApiProperty({ required: false })
  dp_1cParentId: string;

  @ApiProperty({ required: false })
  dp_seoTitle: string;

  @ApiProperty({ required: false })
  dp_seoUrlSegment: string;

  @ApiProperty({ required: false, enum: FolderValue })
  dp_1cIsFolder: number;
}
