import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class RemoveOrderStatusDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  dp_id: number;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' })
  dp_orderId: string;
}
