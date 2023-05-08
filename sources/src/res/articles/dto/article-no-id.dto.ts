import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';

import ArticleApiProperty from '../articles.swagger';
import ArticleAttachedLinksNoId from './article-attached-links-no-id.dto';

export default class ArticleNoId {
  @Exclude()
  dp_id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty(ArticleApiProperty.dp_name)
  dp_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty(ArticleApiProperty.dp_date)
  dp_date: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty(ArticleApiProperty.dp_urlSegment)
  dp_urlSegment: string;

  @IsString()
  @ApiProperty(ArticleApiProperty.dp_photoUrl)
  dp_photoUrl: string;

  @IsString()
  @ApiProperty(ArticleApiProperty.dp_text)
  dp_text: string;

  @IsNumber()
  @ApiProperty(ArticleApiProperty.dp_sortingIndex)
  dp_sortingIndex: number;

  @IsString()
  @ApiProperty(ArticleApiProperty.dp_seoKeywords)
  dp_seoKeywords: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty(ArticleApiProperty.dp_seoDescription)
  dp_seoDescription: string;

  @IsBoolean()
  @ApiProperty(ArticleApiProperty.dp_isHidden)
  dp_isHidden: boolean;

  @IsArray()
  @Type(() => ArticleAttachedLinksNoId)
  @ApiProperty({ type: [ArticleAttachedLinksNoId] })
  dp_articleAttachedLinks: ArticleAttachedLinksNoId[];
}
