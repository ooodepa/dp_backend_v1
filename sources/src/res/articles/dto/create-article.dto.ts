import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

import { LstArticleAttachedLinks } from '../entities/article-attached-links.entity';

export class CreateArticleDto {
  @ApiProperty({ example: 'Каталоги' })
  @IsString()
  dp_name: string;

  @ApiProperty({ example: '2023-04-13T05:00:00.000' })
  @IsString()
  dp_date: Date;

  @ApiProperty({ example: 'catalogs' })
  @IsString()
  dp_urlSegment: string;

  @ApiProperty({ example: 'https://example.com/image.png' })
  @IsString()
  dp_photoUrl: string;

  @ApiProperty()
  @IsString()
  dp_text: string;

  @ApiProperty()
  @IsString()
  dp_seoKeywords: string;

  @ApiProperty()
  @IsString()
  dp_seoDescription: string;

  @ApiProperty({ type: [LstArticleAttachedLinks] })
  @IsArray()
  @Type(() => LstArticleAttachedLinks)
  dp_articleAttachedLinks: LstArticleAttachedLinks[];
}
