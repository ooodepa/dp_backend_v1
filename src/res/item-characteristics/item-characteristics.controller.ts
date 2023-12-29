import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Put,
  Delete,
  UseGuards,
  Res,
  Query,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';

import SwaggerApiResponse from 'src/utils/Swagger/SwaggerApiResponse';
import SwaggerApiOperation from 'src/utils/Swagger/SwaggerApiOperation';
import ItemCharacteristicsApiProperty from './item-characteristics.swagger';
import { ItemCharacteristicsService } from './item-characteristics.service';
import { IsAdministratorGuard } from 'src/guards/IsAdministratorGuard.guard';
import ItemCharacteristicWithIdDto from './dto/item-characteristic-with-id.dto';
import { VerifyAccessTokenGuard } from 'src/guards/VerifyAccessTokenGuard.guard';
import { ParamsItemCharacteristics } from './dto/params-item-characteristics.dto';
import { CreateItemCharacteristicDto } from './dto/create-item-characteristic.dto';
import { UpdateItemCharacteristicDto } from './dto/update-item-characteristic.dto';
import { CreateBulkItemCharacteristicDto } from './dto/create-bulk-item-characteristic.dto';
import { UpdateBulkItemCharacteristicDto } from './dto/update-bulk-item-characteristic.dto';

@ApiTags('api_v1_item-characteristics')
@Controller('/api/v1/item-characteristics')
export class ItemCharacteristicsController {
  constructor(
    private readonly itemCharacteristicsService: ItemCharacteristicsService,
  ) {}

  @ApiTags('ADMIN')
  @ApiOperation(SwaggerApiOperation.Create)
  @ApiResponse(SwaggerApiResponse.Created)
  @ApiResponse(SwaggerApiResponse.ValidationError)
  @ApiResponse(SwaggerApiResponse.UnauthorizedAdmin)
  @ApiResponse(SwaggerApiResponse.DublicateError)
  @ApiResponse(SwaggerApiResponse.ServerError)
  @ApiBearerAuth('access-token')
  @UseGuards(IsAdministratorGuard)
  @UseGuards(VerifyAccessTokenGuard)
  @Post()
  create(@Body() dto: CreateItemCharacteristicDto) {
    return this.itemCharacteristicsService.create(dto);
  }

  @ApiTags('ADMIN')
  @ApiOperation(SwaggerApiOperation.CreateBulk)
  @ApiResponse(SwaggerApiResponse.CreatedBulk)
  @ApiResponse(SwaggerApiResponse.ValidationError)
  @ApiResponse(SwaggerApiResponse.UnauthorizedAdmin)
  @ApiResponse(SwaggerApiResponse.DublicateError)
  @ApiResponse(SwaggerApiResponse.ServerError)
  @ApiBearerAuth('access-token')
  @UseGuards(IsAdministratorGuard)
  @UseGuards(VerifyAccessTokenGuard)
  @Post('bulk')
  createBulk(@Body() dto: CreateBulkItemCharacteristicDto) {
    return this.itemCharacteristicsService.createBulk(dto.bulk);
  }

  @ApiTags('any')
  @ApiOperation(SwaggerApiOperation.Find)
  @ApiResponse({
    status: HttpStatus.OK,
    description: `Получили список записей\n\n
Пример XML:\n\n
- \`<?xml version="1.0" encoding="UTF-8"?>\`
- \`<ARRAY>\`
  - \`<OBJECT>\`
    - \`<dp_id>${ItemCharacteristicsApiProperty.dp_id.example}</dp_id>\`
    - \`<dp_sortingIndex>${ItemCharacteristicsApiProperty.dp_sortingIndex.example}</dp_sortingIndex>\`
    - \`<dp_name>${ItemCharacteristicsApiProperty.dp_name.example}</dp_name>\`
    - \`<dp_unit>${ItemCharacteristicsApiProperty.dp_unit.example}</dp_unit>\`
    - \`<dp_isHidden>${ItemCharacteristicsApiProperty.dp_isHidden.example}</dp_isHidden>\`
  - \`<OBJECT>\`
  - \`<OBJECT>\`
    - \`<!-- Аналогично как и первый элемент массива -->\`
  - \`</OBJECT>\`
- \`<ARRAY>\``,
    type: [ItemCharacteristicWithIdDto],
  })
  @ApiResponse(SwaggerApiResponse.ServerError)
  @Get()
  findAll(@Res() res: Response, @Query() params: ParamsItemCharacteristics) {
    return this.itemCharacteristicsService.findAll(res, params);
  }

  @ApiTags('any')
  @ApiOperation(SwaggerApiOperation.FindById)
  @ApiResponse({
    ...SwaggerApiResponse.FindedById,
    type: ItemCharacteristicWithIdDto,
  })
  @ApiResponse(SwaggerApiResponse.NotFound)
  @ApiResponse(SwaggerApiResponse.ServerError)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemCharacteristicsService.findOne(+id);
  }

  @ApiTags('ADMIN')
  @ApiOperation(SwaggerApiOperation.UpdateById)
  @ApiResponse(SwaggerApiResponse.UpdatedById)
  @ApiResponse(SwaggerApiResponse.ValidationError)
  @ApiResponse(SwaggerApiResponse.UnauthorizedAdmin)
  @ApiResponse(SwaggerApiResponse.NotFound)
  @ApiResponse(SwaggerApiResponse.DublicateError)
  @ApiResponse(SwaggerApiResponse.ServerError)
  @ApiBearerAuth('access-token')
  @UseGuards(IsAdministratorGuard)
  @UseGuards(VerifyAccessTokenGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateItemCharacteristicDto) {
    return this.itemCharacteristicsService.update(+id, dto);
  }

  @ApiTags('ADMIN')
  @ApiOperation(SwaggerApiOperation.UpdateById)
  @ApiResponse(SwaggerApiResponse.UpdatedById)
  @ApiResponse(SwaggerApiResponse.ValidationError)
  @ApiResponse(SwaggerApiResponse.UnauthorizedAdmin)
  @ApiResponse(SwaggerApiResponse.NotFound)
  @ApiResponse(SwaggerApiResponse.DublicateError)
  @ApiResponse(SwaggerApiResponse.ServerError)
  @ApiBearerAuth('access-token')
  @UseGuards(IsAdministratorGuard)
  @UseGuards(VerifyAccessTokenGuard)
  @Put('bulk')
  updateBulk(@Body() dto: UpdateBulkItemCharacteristicDto) {
    return this.itemCharacteristicsService.updateBulk(dto.bulk);
  }

  @ApiTags('ADMIN')
  @ApiOperation(SwaggerApiOperation.DeleteById)
  @ApiResponse(SwaggerApiResponse.DeletedById)
  @ApiResponse(SwaggerApiResponse.UnauthorizedAdmin)
  @ApiResponse(SwaggerApiResponse.NotFound)
  @ApiResponse(SwaggerApiResponse.ServerError)
  @ApiBearerAuth('access-token')
  @UseGuards(IsAdministratorGuard)
  @UseGuards(VerifyAccessTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemCharacteristicsService.remove(+id);
  }
}
