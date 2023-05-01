import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';

import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { VerifyAccessTokenGuard } from 'src/guards/VerifyAccessTokenGuard.guard';

@ApiTags('api_v1_orders')
@Controller('/api/v1/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiTags('user')
  @ApiBearerAuth('access-token')
  @UseGuards(VerifyAccessTokenGuard)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Req() req) {
    return this.ordersService.create(createOrderDto, req);
  }

  @ApiTags('user')
  @ApiBearerAuth('access-token')
  @UseGuards(VerifyAccessTokenGuard)
  @Get()
  findAll(@Req() req) {
    return this.ordersService.findAll(req);
  }

  @ApiTags('user')
  @ApiBearerAuth('access-token')
  @UseGuards(VerifyAccessTokenGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    return this.ordersService.findOne(id, req);
  }

  @ApiTags('MODER')
  @ApiBearerAuth('access-token')
  @UseGuards(VerifyAccessTokenGuard)
  @Patch(':id/completed')
  updateCompleted(@Param('id') id: string) {
    return this.ordersService.updateCompleted(id);
  }

  @ApiTags('user')
  @ApiBearerAuth('access-token')
  @UseGuards(VerifyAccessTokenGuard)
  @Patch(':id/cancel')
  updateCancelled(@Param('id') id: string, @Req() req) {
    return this.ordersService.updateCancelled(id, req);
  }
}
