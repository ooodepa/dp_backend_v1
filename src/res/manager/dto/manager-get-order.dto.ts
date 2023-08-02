import { ApiProperty } from '@nestjs/swagger';
import { GetOrderWithIdDto } from 'src/res/orders/dto/get-order-with-id.dto';

export default class ManagerGetOrder {
  @ApiProperty()
  take: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  skip: number;

  @ApiProperty({ type: [GetOrderWithIdDto] })
  data: [GetOrderWithIdDto];
}
