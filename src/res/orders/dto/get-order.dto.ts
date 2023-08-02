import { ApiProperty } from '@nestjs/swagger';

export class GetOrderDto {
  @ApiProperty()
  dp_id: string;

  @ApiProperty({ example: '0000-00-00T00:00:00.000Z' })
  dp_date: string;

  @ApiProperty()
  dp_userId: number;

  @ApiProperty({ example: '0000-00-00T00:00:00.000Z' })
  dp_cancaledOn: string;

  @ApiProperty({ example: '0000-00-00T00:00:00.000Z' })
  dp_fulfilledOn: string;

  @ApiProperty({ example: '0000-00-00T00:00:00.000Z' })
  dp_receivedOn: string;
}
