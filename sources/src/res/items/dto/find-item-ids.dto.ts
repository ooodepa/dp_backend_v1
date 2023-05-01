import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray } from 'class-validator';

export class FindItemIdsDto {
  @ApiProperty()
  @IsArray()
  @Type(() => String)
  ids: string[];
}
