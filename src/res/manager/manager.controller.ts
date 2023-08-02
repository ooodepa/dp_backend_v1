import {
  Controller,
  Get,
  Query,
  UseGuards,
  Param,
  Patch,
  Post,
  Delete,
  Body,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ManagerService } from './manager.service';

import GetUserDto from '../users/dto/get-user.dto';
import ManagerGetOrder from './dto/manager-get-order.dto';
import { IsManagerGuard } from 'src/guards/IsManagerGuard.guard';
import ManagerGetOrderQuery from './dto/manager-get-order-query.dto';
import SwaggerApiResponse from 'src/utils/Swagger/SwaggerApiResponse';
import { GetOrderWithIdDto } from '../orders/dto/get-order-with-id.dto';
import SwaggerApiOperation from 'src/utils/Swagger/SwaggerApiOperation';
import { VerifyAccessTokenGuard } from 'src/guards/VerifyAccessTokenGuard.guard';
import { CreateOrderStatusDto } from '../order-statuses/dto/create-order-status.dto';

@ApiTags('MANAGER', 'api_v1_manager')
@Controller('api/v1/manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @ApiTags('MANAGER')
  @ApiOperation(SwaggerApiOperation.Find)
  @ApiResponse({ ...SwaggerApiResponse.Finded, type: [ManagerGetOrder] })
  @ApiResponse(SwaggerApiResponse.UnauthorizedManager)
  @ApiResponse(SwaggerApiResponse.ServerError)
  @ApiBearerAuth('access-token')
  @UseGuards(VerifyAccessTokenGuard)
  @UseGuards(IsManagerGuard)
  @Get('orders')
  getOrders(@Query() query: ManagerGetOrderQuery) {
    return this.managerService.getOrders(query);
  }

  @ApiTags('MANAGER')
  @ApiOperation(SwaggerApiOperation.FindById)
  @ApiResponse({ ...SwaggerApiResponse.FindedById, type: GetOrderWithIdDto })
  @ApiResponse(SwaggerApiResponse.UnauthorizedManager)
  @ApiResponse(SwaggerApiResponse.NotFound)
  @ApiResponse(SwaggerApiResponse.ServerError)
  @ApiBearerAuth('access-token')
  @UseGuards(VerifyAccessTokenGuard)
  @UseGuards(IsManagerGuard)
  @Get('orders/:id')
  getOrder(@Param('id') id: string) {
    return this.managerService.getOrder(id);
  }

  @ApiTags('MANAGER')
  @ApiOperation(SwaggerApiOperation.FindById)
  @ApiResponse({ ...SwaggerApiResponse.FindedById, type: GetUserDto })
  @ApiResponse(SwaggerApiResponse.UnauthorizedManager)
  @ApiResponse(SwaggerApiResponse.NotFound)
  @ApiResponse(SwaggerApiResponse.ServerError)
  @ApiBearerAuth('access-token')
  @UseGuards(VerifyAccessTokenGuard)
  @UseGuards(IsManagerGuard)
  @Get('users/:id')
  getUser(@Param('id') id: string) {
    return this.managerService.getUser(+id);
  }

  @ApiTags('MANAGER')
  @ApiOperation({ description: 'Отмена заявки' })
  @ApiResponse(SwaggerApiResponse.UnauthorizedManager)
  @ApiResponse(SwaggerApiResponse.NotFound)
  @ApiResponse(SwaggerApiResponse.ServerError)
  @ApiBearerAuth('access-token')
  @UseGuards(VerifyAccessTokenGuard)
  @UseGuards(IsManagerGuard)
  @Patch('orders/:id/is-canceled')
  patchOrderIsCanceledByManager(@Param('id') id: string) {
    return this.managerService.patchOrderIsCanceledByManager(id);
  }

  @ApiTags('MANAGER')
  @ApiOperation({ description: 'Пометка заявки отправленной' })
  @ApiResponse(SwaggerApiResponse.UnauthorizedManager)
  @ApiResponse(SwaggerApiResponse.NotFound)
  @ApiResponse(SwaggerApiResponse.ServerError)
  @ApiBearerAuth('access-token')
  @UseGuards(VerifyAccessTokenGuard)
  @UseGuards(IsManagerGuard)
  @Patch('orders/:id/is-sented')
  patchOrderIsSentedByManager(@Param('id') id: string) {
    return this.managerService.patchOrderIsSentedByManager(id);
  }

  @ApiTags('MANAGER')
  @ApiOperation(SwaggerApiOperation.Create)
  @ApiResponse({ ...SwaggerApiResponse.Created })
  @ApiResponse(SwaggerApiResponse.UnauthorizedManager)
  @ApiResponse(SwaggerApiResponse.NotFound)
  @ApiResponse(SwaggerApiResponse.ServerError)
  @Post('order-statuses')
  createOrderStatus(@Body() dto: CreateOrderStatusDto) {
    return this.managerService.createOrderStatus(dto);
  }

  @ApiTags('MANAGER')
  @ApiOperation(SwaggerApiOperation.DeleteById)
  @ApiResponse({ ...SwaggerApiResponse.DeletedById })
  @ApiResponse(SwaggerApiResponse.UnauthorizedManager)
  @ApiResponse(SwaggerApiResponse.NotFound)
  @ApiResponse(SwaggerApiResponse.ServerError)
  @Delete('order-statuses/:id/orders/:orderId')
  removeOrderStatus(
    @Param('id') id: number,
    @Param('orderId') orderId: string,
  ) {
    return this.managerService.removeOrderStatus(+id, orderId);
  }
}
