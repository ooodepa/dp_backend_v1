import {
  Controller,
  Get,
  Query,
  UseGuards,
  Param,
  Patch,
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
  @ApiOperation({ description: 'Пометка заявки отобранной' })
  @ApiResponse(SwaggerApiResponse.UnauthorizedManager)
  @ApiResponse(SwaggerApiResponse.NotFound)
  @ApiResponse(SwaggerApiResponse.ServerError)
  @ApiBearerAuth('access-token')
  @UseGuards(VerifyAccessTokenGuard)
  @UseGuards(IsManagerGuard)
  @Patch('orders/:id/completed')
  updateCompleted(@Param('id') id: string) {
    return this.managerService.UpdateOrderIsCompleted(id);
  }
}
