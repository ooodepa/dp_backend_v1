import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray } from 'class-validator';

import { CreateArticleDto } from './create-article.dto';

export class CreateBulkArticleDto {
  @ApiProperty({ type: [CreateArticleDto] })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => CreateArticleDto)
  bulk: [CreateArticleDto];
}
