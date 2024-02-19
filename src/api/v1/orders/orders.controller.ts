import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Req,
  Res,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import SendCheckDto from './dto/sendCheckDto';
import { OrdersService } from './orders.service';
import { GetOrderDto } from './dto/get-order.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrderWithIdDto } from './dto/get-order-with-id.dto';
import { CreateNoAuthOrderDto } from './dto/create-no-auth-order.dto';
import SwaggerApiResponse from 'src/utils/Swagger/SwaggerApiResponse';
import SwaggerApiOperation from 'src/utils/Swagger/SwaggerApiOperation';
import HttpResponseDto from 'src/utils/HttpResponseDto/HttpResponseDto.dto';
import { VerifyAccessTokenGuard } from 'src/guards/VerifyAccessTokenGuard.guard';

@ApiTags('api_v1_orders')
@Controller('/api/v1/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiTags('user')
  @ApiOperation(SwaggerApiOperation.CreateUuid)
  @ApiResponse({ ...SwaggerApiResponse.CreatedUuid, type: GetOrderDto })
  @ApiResponse(SwaggerApiResponse.Unauthorized)
  @ApiResponse(SwaggerApiResponse.ServerError)
  @ApiBearerAuth('access-token')
  @UseGuards(VerifyAccessTokenGuard)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Req() req) {
    return this.ordersService.create(createOrderDto, req);
  }

  @ApiTags('any')
  @ApiOperation(SwaggerApiOperation.CreateUuid)
  @ApiResponse({ ...SwaggerApiResponse.CreatedUuid })
  @ApiResponse(SwaggerApiResponse.ServerError)
  @Post('no-auth')
  createAsAnonim(@Body() dto: CreateNoAuthOrderDto) {
    return this.ordersService.createAsAnonim(dto);
  }

  @ApiTags('user')
  @ApiOperation(SwaggerApiOperation.Find)
  @ApiResponse({ ...SwaggerApiResponse.Finded, type: [GetOrderDto] })
  @ApiResponse(SwaggerApiResponse.Unauthorized)
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
  @ApiResponse(SwaggerApiResponse.Unauthorized)
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

  @ApiTags('user')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Документ счёт-фактура отправлен на электронную почту',
    type: HttpResponseDto,
  })
  @ApiBearerAuth('access-token')
  @UseGuards(VerifyAccessTokenGuard)
  @Post(':id/send-check')
  sendToEmailCheck(
    @Param('id') id: string,
    @Req() req,
    @Res() res,
    @Body() dto: SendCheckDto,
  ) {
    return this.ordersService.sendToEmailCheck(id, req, dto, res);
  }
}
