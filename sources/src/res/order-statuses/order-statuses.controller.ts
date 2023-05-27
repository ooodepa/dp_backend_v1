import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';

import { OrderStatusesService } from './order-statuses.service';

@ApiTags('api_v1_order-statuses')
@Controller('api/v1/order-statuses')
export class OrderStatusesController {
  constructor(private readonly orderStatusesService: OrderStatusesService) {}

  @ApiTags('any')
  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.orderStatusesService.findAll(id);
  }
}
