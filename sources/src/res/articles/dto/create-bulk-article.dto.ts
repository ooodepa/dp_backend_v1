import { Type } from 'class-transformer';
import { IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import ArticleExcludeIdDto from './article-exclude-id.dto';

export class CreateBulkArticleDto {
  @IsArray()
  @Type(() => ArticleExcludeIdDto)
  @ApiProperty({ type: [ArticleExcludeIdDto] })
  bulk: [ArticleExcludeIdDto];
}
