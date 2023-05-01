import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray } from 'class-validator';

import { CreateHelperDto } from './create-helper.dto';

export class CreateBulkHelperDto {
  @ApiProperty({ type: [CreateHelperDto] })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => CreateHelperDto)
  bulk: [CreateHelperDto];
}
