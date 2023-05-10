import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray } from 'class-validator';

import ItemCharacteristicExcludeIdDto from './item-characteristic-exclude-id.dto';

export class CreateBulkItemCharacteristicDto {
  @ApiProperty({ type: [ItemCharacteristicExcludeIdDto] })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ItemCharacteristicExcludeIdDto)
  bulk: [ItemCharacteristicExcludeIdDto];
}
