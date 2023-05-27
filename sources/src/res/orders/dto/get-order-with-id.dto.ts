import { ApiProperty } from '@nestjs/swagger';
import { GetOrderDto } from './get-order.dto';

class GetOrderItem {
  @ApiProperty()
  dp_id: number;

  @ApiProperty()
  dp_orderId: string;

  @ApiProperty()
  dp_itemId: number;

  @ApiProperty()
  dp_count: number;

  @ApiProperty()
  dp_cost: number;
}

export class GetOrderWithIdDto extends GetOrderDto {
  @ApiProperty({ type: [GetOrderItem] })
  dp_orderItems: [GetOrderItem];
}
