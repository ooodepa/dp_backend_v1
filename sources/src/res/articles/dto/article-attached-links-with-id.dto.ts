import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

import ArticleAttachedLinksNoId from './article-attached-links-no-id.dto';
import ArticleAttachedLinksApiProperty from '../articleAttachedLinks.swagger';

export default class ArticleAttachedLinksWithId extends ArticleAttachedLinksNoId {
  @IsNumber()
  @ApiProperty(ArticleAttachedLinksApiProperty.dp_id)
  dp_id: number;

  @IsUUID()
  @IsNotEmpty()
  @IsString()
  @ApiProperty(ArticleAttachedLinksApiProperty.dp_articleId)
  dp_articleId: string;
}
