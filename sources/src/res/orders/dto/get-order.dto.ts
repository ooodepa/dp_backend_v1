import { ApiProperty } from '@nestjs/swagger';

export class GetOrderDto {
  @ApiProperty()
  dp_id: string;

  @ApiProperty()
  dp_date: string;

  @ApiProperty()
  dp_userId: number;

  @ApiProperty()
  dp_isCancelled: boolean;

  @ApiProperty()
  dp_isCompleted: boolean;
}
