import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import ArticleAttachedLinksApiProperty from '../articleAttachedLinks.swagger';

export default class ArticleAttachedLinksNoId {
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
