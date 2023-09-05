import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Put,
  Delete,
  Query,
  UseGuards,
  Res,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';

import { GetItemCategoryDto } from './dto/get-item-category.dto';
import { ItemCategoriesService } from './item-categories.service';
import ItemCategoriesApiProperty from './item-categories.swagger';
import SwaggerApiResponse from 'src/utils/Swagger/SwaggerApiResponse';
import { CreateItemCategoryDto } from './dto/create-item-category.dto';
import { UpdateItemCategoryDto } from './dto/update-item-category.dto';
import { FilterItemCategoryDto } from './dto/filter-item-category.dto';
import SwaggerApiOperation from 'src/utils/Swagger/SwaggerApiOperation';
import { IsAdministratorGuard } from 'src/guards/IsAdministratorGuard.guard';
import { CreateBulkItemCategoryDto } from './dto/create-bulk-item-category.dto';
import { UpdateBulkItemCategoryDto } from './dto/update-bulk-item-category.dto';
import { VerifyAccessTokenGuard } from 'src/guards/VerifyAccessTokenGuard.guard';

@ApiTags('api_v1_item-categories')
@Controller('/api/v1/item-categories')
export class ItemCategoriesController {
  constructor(private readonly itemCategoriesService: ItemCategoriesService) {}

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
  create(@Body() dto: CreateItemCategoryDto) {
    return this.itemCategoriesService.create(dto);
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
  createBulk(@Body() dto: CreateBulkItemCategoryDto) {
    return this.itemCategoriesService.createBulk(dto.bulk);
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
    - \`<dp_id>${ItemCategoriesApiProperty.dp_id.example}</dp_id>\`
    - \`<dp_itemBrandId>${ItemCategoriesApiProperty.dp_itemBrandId.example}</dp_itemBrandId>\`
    - \`<dp_name>${ItemCategoriesApiProperty.dp_name.example}</dp_name>\`
    - \`<dp_photoUrl>${ItemCategoriesApiProperty.dp_photoUrl.example}</dp_photoUrl>\`
    - \`<dp_urlSegment>${ItemCategoriesApiProperty.dp_urlSegment.example}</dp_urlSegment>\`
    - \`<dp_sortingIndex>${ItemCategoriesApiProperty.dp_sortingIndex.example}</dp_sortingIndex>\`
    - \`<dp_seoKeywords>${ItemCategoriesApiProperty.dp_seoKeywords.example}</dp_seoKeywords>\`
    - \`<dp_seoDescription>${ItemCategoriesApiProperty.dp_seoDescription.example}</dp_seoDescription>\`
    - \`<dp_isHidden>${ItemCategoriesApiProperty.dp_isHidden.example}</dp_isHidden>\`
  - \`</OBJECT>\`
  - \`<OBJECT>\`
    - \`<!-- Аналогично как и первый элемент массива -->\`
  - \`</OBJECT>\`
- \`</ARRAY>\``,
    type: [GetItemCategoryDto],
  })
  @ApiResponse(SwaggerApiResponse.ServerError)
  @Get()
  findAll(@Res() res: Response, @Query() filter: FilterItemCategoryDto) {
    return this.itemCategoriesService.findAll(res, filter);
  }

  @ApiTags('any')
  @ApiOperation(SwaggerApiOperation.FindById)
  @ApiResponse({ ...SwaggerApiResponse.FindedById, type: GetItemCategoryDto })
  @ApiResponse(SwaggerApiResponse.NotFound)
  @ApiResponse(SwaggerApiResponse.ServerError)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemCategoriesService.findOne(+id);
  }

  @ApiTags('any')
  @ApiOperation(SwaggerApiOperation.FindById)
  @ApiResponse({ ...SwaggerApiResponse.FindedById, type: GetItemCategoryDto })
  @ApiResponse(SwaggerApiResponse.NotFound)
  @ApiResponse(SwaggerApiResponse.ServerError)
  @Get('filter-one/url/:url')
  findOneByUrl(@Param('url') url: string) {
    return this.itemCategoriesService.findOneByUrl(url);
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
  update(@Param('id') id: string, @Body() dto: UpdateItemCategoryDto) {
    return this.itemCategoriesService.update(+id, dto);
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
  updateBulk(@Body() dto: UpdateBulkItemCategoryDto) {
    return this.itemCategoriesService.updateBulk(dto.bulk);
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
    return this.itemCategoriesService.remove(+id);
  }
}
