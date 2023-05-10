import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray } from 'class-validator';

import HelperExcludeIdDto from './helper-exclude-id.dto';

export class CreateBulkHelperDto {
  @ApiProperty({ type: [HelperExcludeIdDto] })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => HelperExcludeIdDto)
  bulk: [HelperExcludeIdDto];
}
