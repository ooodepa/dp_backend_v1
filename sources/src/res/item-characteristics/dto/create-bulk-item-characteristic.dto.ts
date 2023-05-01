import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray } from 'class-validator';

import ItemCharacteristicNoIdDto from './item-characteristics-no-id.dto';

export class CreateBulkItemCharacteristicDto {
  @ApiProperty({ type: [ItemCharacteristicNoIdDto] })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ItemCharacteristicNoIdDto)
  bulk: [ItemCharacteristicNoIdDto];
}
