import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
  Res,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';

import { ItemBrandsService } from './item-brands.service';
import CreateItemBrandDto from './dto/create-item-brand.dto';
import ItemBrandWithIdDto from './dto/item-brand-with-id.dto';
import { UpdateItemBrandDto } from './dto/update-item-brand.dto';
import SwaggerApiResponse from 'src/utils/Swagger/SwaggerApiResponse';
import SwaggerApiOperation from 'src/utils/Swagger/SwaggerApiOperation';
import { CreateBulkItemBrandDto } from './dto/create-bulk-item-brand.dto';
import { UpdateBulkItemBrandDto } from './dto/update-bulk-item-brand.dto';
import { IsAdministratorGuard } from 'src/guards/IsAdministratorGuard.guard';
import { VerifyAccessTokenGuard } from 'src/guards/VerifyAccessTokenGuard.guard';

@ApiTags('api_v1_item-brands')
@Controller('/api/v1/item-brands')
export class ItemBrandsController {
  constructor(private readonly itemBrandsService: ItemBrandsService) {}

  @ApiTags('ADMIN')
  @ApiResponse(SwaggerApiResponse.ServerError)
  @ApiBearerAuth('access-token')
  @UseGuards(IsAdministratorGuard)
  @UseGuards(VerifyAccessTokenGuard)
  @Patch(':id/isHidden/:isHidden')
  setShow(@Param('id') id: string, @Param('isHidden') isHidden: string) {
    return this.itemBrandsService.setShow(+id, isHidden);
  }

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
  create(@Body() dto: CreateItemBrandDto) {
    return this.itemBrandsService.create(dto);
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
  createBulk(@Body() dto: CreateBulkItemBrandDto) {
    return this.itemBrandsService.createBulk(dto.bulk);
  }

  @ApiTags('any')
  @ApiOperation(SwaggerApiOperation.Find)
  @ApiResponse({ ...SwaggerApiResponse.Finded, type: [ItemBrandWithIdDto] })
  @ApiResponse(SwaggerApiResponse.ServerError)
  @Get()
  findAll(@Res() res: Response) {
    return this.itemBrandsService.findAll(res);
  }

  @ApiTags('any')
  @ApiOperation(SwaggerApiOperation.FindById)
  @ApiResponse({ ...SwaggerApiResponse.FindedById, type: ItemBrandWithIdDto })
  @ApiResponse(SwaggerApiResponse.NotFound)
  @ApiResponse(SwaggerApiResponse.ServerError)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemBrandsService.findOne(+id);
  }

  @ApiTags('any')
  @ApiOperation(SwaggerApiOperation.FindById)
  @ApiResponse({ ...SwaggerApiResponse.FindedById, type: ItemBrandWithIdDto })
  @ApiResponse(SwaggerApiResponse.NotFound)
  @ApiResponse(SwaggerApiResponse.ServerError)
  @Get('filter-one/url/:url')
  findOneByUrl(@Param('url') url: string) {
    return this.itemBrandsService.findOneByUrl(url);
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
  update(@Param('id') id: string, @Body() dto: UpdateItemBrandDto) {
    return this.itemBrandsService.update(+id, dto);
  }

  @ApiTags('ADMIN')
  @ApiOperation(SwaggerApiOperation.UpdateBulk)
  @ApiResponse(SwaggerApiResponse.UpdatedBulk)
  @ApiResponse(SwaggerApiResponse.ValidationError)
  @ApiResponse(SwaggerApiResponse.UnauthorizedAdmin)
  @ApiResponse(SwaggerApiResponse.NotFound)
  @ApiResponse(SwaggerApiResponse.DublicateError)
  @ApiResponse(SwaggerApiResponse.ServerError)
  @ApiBearerAuth('access-token')
  @UseGuards(IsAdministratorGuard)
  @UseGuards(VerifyAccessTokenGuard)
  @Put('bulk')
  updateBulk(@Body() dto: UpdateBulkItemBrandDto) {
    return this.itemBrandsService.updateBulk(dto.bulk);
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
    return this.itemBrandsService.remove(+id);
  }
}
