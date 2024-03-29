import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray } from 'class-validator';

export class FindItemModelsDto {
  @ApiProperty()
  @IsArray()
  @Type(() => String)
  models: string[];
}
