import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray } from 'class-validator';

import ItemCharacteristicWithIdDto from './item-characteristic-with-id.dto';

export class UpdateBulkItemCharacteristicDto {
  @ApiProperty({ type: [ItemCharacteristicWithIdDto] })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ItemCharacteristicWithIdDto)
  bulk: [ItemCharacteristicWithIdDto];
}
