import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

import ArticleDto from './article.dto';
import ArticleAttachedLinksApiProperty from '../articleAttachedLinks.swagger';

class ArticleAttachedLinksExcludeIdDto {
  @Exclude()
  dp_id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty(ArticleAttachedLinksApiProperty.dp_name)
  dp_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty(ArticleAttachedLinksApiProperty.dp_url)
  dp_url: string;

  @Exclude()
  dp_articleId: string;
}

export default class ArticleExcludeIdDto extends ArticleDto {
  @Exclude()
  dp_id: string;

  @IsArray()
  @Type(() => ArticleAttachedLinksExcludeIdDto)
  @ApiProperty({ type: [ArticleAttachedLinksExcludeIdDto] })
  dp_articleAttachedLinks: ArticleAttachedLinksExcludeIdDto[];
}
