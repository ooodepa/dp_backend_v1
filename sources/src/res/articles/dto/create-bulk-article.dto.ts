import { Type } from 'class-transformer';
import { IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { CreateArticleDto } from './create-article.dto';

export class CreateBulkArticleDto {
  @IsArray()
  @Type(() => CreateArticleDto)
  @ApiProperty({ type: [CreateArticleDto] })
  bulk: [CreateArticleDto];
}
