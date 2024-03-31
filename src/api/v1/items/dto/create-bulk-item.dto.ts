import ItemDto from './item.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray } from 'class-validator';

export class CreateBulkItemDto {
  @ApiProperty({ type: [ItemDto] })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ItemDto)
  bulk: [ItemDto];
}
