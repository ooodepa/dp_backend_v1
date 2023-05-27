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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { VerifyAccessTokenGuard } from 'src/guards/VerifyAccessTokenGuard.guard';
import SwaggerApiResponse from 'src/utils/Swagger/SwaggerApiResponse';
import SwaggerApiOperation from 'src/utils/Swagger/SwaggerApiOperation';
import { GetOrderDto } from './dto/get-order.dto';
import { GetOrderWithIdDto } from './dto/get-order-with-id.dto';

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
  @ApiOperation(SwaggerApiOperation.Find)
  @ApiResponse({ ...SwaggerApiResponse.Finded, type: [GetOrderDto] })
  @ApiResponse(SwaggerApiResponse.UnauthorizedAdmin)
  @ApiResponse(SwaggerApiResponse.ServerError)
  @ApiBearerAuth('access-token')
  @UseGuards(VerifyAccessTokenGuard)
  @Get()
  findAll(@Req() req) {
    return this.ordersService.findAll(req);
  }

  @ApiTags('user')
  @ApiOperation(SwaggerApiOperation.FindById)
  @ApiResponse({ ...SwaggerApiResponse.FindedById, type: GetOrderWithIdDto })
  @ApiResponse(SwaggerApiResponse.UnauthorizedAdmin)
  @ApiResponse(SwaggerApiResponse.NotFound)
  @ApiResponse(SwaggerApiResponse.ServerError)
  @ApiBearerAuth('access-token')
  @UseGuards(VerifyAccessTokenGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    return this.ordersService.findOne(id, req);
  }

  @ApiTags('user')
  @ApiBearerAuth('access-token')
  @UseGuards(VerifyAccessTokenGuard)
  @Patch(':id/is-canceled')
  patchIsCanceledByClient(@Param('id') id: string, @Req() req) {
    return this.ordersService.patchIsCanceledByClient(id, req);
  }

  @ApiTags('user')
  @ApiBearerAuth('access-token')
  @UseGuards(VerifyAccessTokenGuard)
  @Patch(':id/is-received')
  patchIsReceivedByClient(@Param('id') id: string, @Req() req) {
    return this.ordersService.patchIsReceivedByClient(id, req);
  }
}
