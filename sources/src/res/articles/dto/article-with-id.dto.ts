import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import ArticleDto from './article.dto';
import ArticleApiProperty from '../articles.swagger';
import ArticleAttachedLinksApiProperty from '../articleAttachedLinks.swagger';

class ArticleAttachedLinksWithIdDto {
  @IsNumber()
  @ApiProperty(ArticleAttachedLinksApiProperty.dp_id)
  dp_id: number;

  @IsUUID()
  @IsNotEmpty()
  @IsString()
  @ApiProperty(ArticleAttachedLinksApiProperty.dp_articleId)
  dp_articleId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty(ArticleAttachedLinksApiProperty.dp_name)
  dp_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty(ArticleAttachedLinksApiProperty.dp_url)
  dp_url: string;
}

export default class ArticleWithIdDto extends ArticleDto {
  @IsNumber()
  @ApiProperty(ArticleApiProperty.dp_id)
  dp_id: string;

  @IsArray()
  @IsNotEmpty()
  @Type(() => ArticleAttachedLinksWithIdDto)
  @ApiProperty({ type: [ArticleAttachedLinksWithIdDto] })
  dp_articleAttachedLinks: ArticleAttachedLinksWithIdDto[];
}
