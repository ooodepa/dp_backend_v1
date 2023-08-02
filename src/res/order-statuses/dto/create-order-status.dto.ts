import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateOrderStatusDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  dp_status: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' })
  dp_orderId: string;
}
