import { ApiProperty } from '@nestjs/swagger';
import { GetOrderDto } from './get-order.dto';

class GetOrderItem {
  @ApiProperty()
  dp_id: number;

  @ApiProperty({ example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' })
  dp_orderId: string;

  @ApiProperty({ example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' })
  dp_itemId: string;

  @ApiProperty()
  dp_count: number;

  @ApiProperty()
  dp_cost: number;
}

export class GetOrderWithIdDto extends GetOrderDto {
  @ApiProperty({ type: [GetOrderItem] })
  dp_orderItems: [GetOrderItem];
}
