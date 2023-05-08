import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

import ArticleNoId from './article-no-id.dto';
import ArticleApiProperty from '../articles.swagger';
import ArticleAttachedLinksWithId from './article-attached-links-with-id.dto';

export default class ArticleWithId extends ArticleNoId {
  @IsNumber()
  @ApiProperty(ArticleApiProperty.dp_id)
  dp_id: string;

  @IsArray()
  @IsNotEmpty()
  @Type(() => ArticleAttachedLinksWithId)
  @ApiProperty({ type: [ArticleAttachedLinksWithId] })
  dp_articleAttachedLinks: ArticleAttachedLinksWithId[];
}
