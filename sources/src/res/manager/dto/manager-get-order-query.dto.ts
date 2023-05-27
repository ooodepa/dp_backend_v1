import { ApiProperty } from '@nestjs/swagger';

export default class ManagerGetOrderQuery {
  @ApiProperty({ required: false })
  take: number;

  @ApiProperty({ required: false })
  page: number;
}
