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
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';

import GetItemDto from './dto/get-item.dto';
import { ItemsService } from './items.service';
import SearchItemsDto from './dto/search-items.dto';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { FilterItemDto } from './dto/filter-item.dto';
import { FindItemIdsDto } from './dto/find-item-ids.dto';
import SearchAllItemsDto from './dto/search-all-items.dto';
import { CreateBulkItemDto } from './dto/create-bulk-item.dto';
import { UpdateBulkItemDto } from './dto/update-bulk-item.dto';
import { FindItemModelsDto } from './dto/find-item-models.dto';
import FindAllByVendorsDto from './dto/find-all-by-vendors.dto';
import FindAllPaginationDto from './dto/find-all-pagination.dto';
import CreateItemFolderBodyDto from './dto/create-folder-query.dto';
import SwaggerApiResponse from 'src/utils/Swagger/SwaggerApiResponse';
import SwaggerApiOperation from 'src/utils/Swagger/SwaggerApiOperation';
import { IsAdministratorGuard } from 'src/guards/IsAdministratorGuard.guard';
import { VerifyAccessTokenGuard } from 'src/guards/VerifyAccessTokenGuard.guard';
import FindAllPaginationResponseDto from './dto/find-all-pagination-response.dto';

@ApiTags('api_v1_items')
@Controller('/api/v1/items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @ApiTags('any')
  @ApiOperation(SwaggerApiOperation.Find)
  @ApiResponse(SwaggerApiResponse.ServerError)
  @Get('image/model/:model')
  getImageByModel(@Param('model') model: string, @Res() res: Response) {
    return this.itemsService.getImageByModel(res, model);
  }

  @ApiTags('any')
  @ApiOperation(SwaggerApiOperation.Find)
  @ApiResponse(SwaggerApiResponse.ServerError)
  @Get('image/id/:id')
  getImageByid(@Param('id') id: string, @Res() res: Response) {
    return this.itemsService.getImageById(res, id);
  }

  @ApiTags('any')
  @ApiResponse(SwaggerApiResponse.ServerError)
  @ApiBearerAuth('access-token')
  @UseGuards(IsAdministratorGuard)
  @UseGuards(VerifyAccessTokenGuard)
  @Patch(':id/isHidden/:isHidden')
  setShow(@Param('id') id: string, @Param('isHidden') isHidden: string) {
    return this.itemsService.setShow(id, isHidden);
  }

  @ApiTags('ADMIN')
  @ApiOperation(SwaggerApiOperation.CreateUuid)
  @ApiResponse(SwaggerApiResponse.CreatedUuid)
  @ApiResponse(SwaggerApiResponse.ValidationError)
  @ApiResponse(SwaggerApiResponse.UnauthorizedAdmin)
  @ApiResponse(SwaggerApiResponse.DublicateError)
  @ApiResponse(SwaggerApiResponse.ServerErrorAndTransaction)
  @ApiBearerAuth('access-token')
  @UseGuards(IsAdministratorGuard)
  @UseGuards(VerifyAccessTokenGuard)
  @Post()
  create(@Body() dto: CreateItemDto) {
    return this.itemsService.create(dto);
  }

  @ApiTags('ADMIN')
  @ApiBearerAuth('access-token')
  @UseGuards(IsAdministratorGuard)
  @UseGuards(VerifyAccessTokenGuard)
  @Post('folder')
  createFolder(@Body() dto: CreateItemFolderBodyDto) {
    return this.itemsService.createFolder(dto);
  }

  @ApiTags('ADMIN')
  @ApiBearerAuth('access-token')
  @UseGuards(IsAdministratorGuard)
  @UseGuards(VerifyAccessTokenGuard)
  @Put('folder')
  updateFolder(@Body() dto: CreateItemFolderBodyDto) {
    return this.itemsService.updateFolder(dto);
  }

  @ApiTags('ADMIN')
  @ApiOperation(SwaggerApiOperation.CreateBulkUuid)
  @ApiResponse(SwaggerApiResponse.CreatedBulkUuid)
  @ApiResponse(SwaggerApiResponse.ValidationError)
  @ApiResponse(SwaggerApiResponse.UnauthorizedAdmin)
  @ApiResponse(SwaggerApiResponse.DublicateError)
  @ApiResponse(SwaggerApiResponse.ServerErrorAndTransaction)
  @ApiBearerAuth('access-token')
  @UseGuards(IsAdministratorGuard)
  @UseGuards(VerifyAccessTokenGuard)
  @Post('bulk')
  createBulk(@Body() dto: CreateBulkItemDto) {
    return this.itemsService.createBulk(dto.bulk);
  }

  @ApiTags('any')
  @ApiOperation(SwaggerApiOperation.Find)
  @ApiResponse({ ...SwaggerApiResponse.Finded, type: [GetItemDto] })
  @ApiResponse(SwaggerApiResponse.ServerErrorAndTransaction)
  @Get()
  findAll(@Query() filter: FilterItemDto, @Res() res: Response) {
    return this.itemsService.findAll(filter, res);
  }

  @ApiTags('any')
  @ApiOperation(SwaggerApiOperation.Find)
  @ApiResponse({
    ...SwaggerApiResponse.Finded,
    type: FindAllPaginationResponseDto,
  })
  @ApiResponse(SwaggerApiResponse.ServerError)
  @Get('pagination')
  findAllPagination(
    @Query() query: FindAllPaginationDto,
    @Res() res: Response,
  ) {
    return this.itemsService.findAllPagination(query, res);
  }

  @ApiTags('any')
  @ApiOperation(SwaggerApiOperation.FindById)
  @ApiResponse({ ...SwaggerApiResponse.FindedById, type: [GetItemDto] })
  @ApiResponse(SwaggerApiResponse.NotFound)
  @ApiResponse(SwaggerApiResponse.ServerError)
  @Get('filter-one/model/:model')
  findOneByModel(@Param('model') model: string) {
    return this.itemsService.findOneByModel(model);
  }

  @ApiTags('any')
  @ApiOperation(SwaggerApiOperation.FindById)
  @ApiResponse({ ...SwaggerApiResponse.FindedById, type: [GetItemDto] })
  @ApiResponse(SwaggerApiResponse.NotFound)
  @ApiResponse(SwaggerApiResponse.ServerError)
  @Get('filter-one/vendor/:vendor')
  findOneByVendor(@Param('vendor') vendor: string) {
    return this.itemsService.findOneByVendor(vendor);
  }

  @ApiTags('any')
  @ApiOperation(SwaggerApiOperation.FindById)
  @ApiResponse({ ...SwaggerApiResponse.FindedById, type: [GetItemDto] })
  @ApiResponse(SwaggerApiResponse.NotFound)
  @ApiResponse(SwaggerApiResponse.ServerError)
  @Post('filter/vendor')
  findByVendors(@Body() body: FindAllByVendorsDto, @Res() res) {
    return this.itemsService.findByVendors(body, res);
  }

  @ApiTags('any')
  @ApiOperation(SwaggerApiOperation.Find)
  @ApiResponse({ ...SwaggerApiResponse.Finded, type: [GetItemDto] })
  @ApiResponse(SwaggerApiResponse.ServerError)
  @Post('filter/models')
  findModels(@Body() dto: FindItemModelsDto, @Res() res: Response) {
    return this.itemsService.findModels(dto, res);
  }

  @ApiTags('any')
  @ApiOperation(SwaggerApiOperation.Find)
  @ApiResponse({ ...SwaggerApiResponse.Finded, type: [GetItemDto] })
  @ApiResponse(SwaggerApiResponse.ServerError)
  @Get('filter/breadcrumbs/model/:model')
  findBreadcrumbs(@Param('model') model: string, @Res() res: Response) {
    return this.itemsService.findBreadCrumbs(model, res);
  }

  @ApiTags('any')
  @ApiOperation(SwaggerApiOperation.Find)
  @ApiResponse({ ...SwaggerApiResponse.Finded, type: [GetItemDto] })
  @ApiResponse(SwaggerApiResponse.ServerError)
  @Post('filter/ids')
  findIds(@Body() dto: FindItemIdsDto, @Res() res: Response) {
    return this.itemsService.findIds(dto, res);
  }

  @ApiTags('any')
  @ApiOperation(SwaggerApiOperation.Find)
  @ApiResponse({ ...SwaggerApiResponse.Finded, type: [GetItemDto] })
  @ApiResponse(SwaggerApiResponse.ServerError)
  @Post('search')
  search(@Body() dto: SearchItemsDto, @Res() res: Response) {
    return this.itemsService.search(dto.search, res);
  }

  @ApiTags('any')
  @ApiOperation(SwaggerApiOperation.Find)
  @ApiResponse({ ...SwaggerApiResponse.Finded, type: [GetItemDto] })
  @ApiResponse(SwaggerApiResponse.ServerError)
  @Post('search-all')
  searchAll(@Body() dto: SearchAllItemsDto, @Res() res: Response) {
    return this.itemsService.searchAll(dto.search, res);
  }

  @ApiTags('any')
  @ApiOperation(SwaggerApiOperation.FindById)
  @ApiResponse({ ...SwaggerApiResponse.FindedById, type: GetItemDto })
  @ApiResponse(SwaggerApiResponse.NotFound)
  @ApiResponse(SwaggerApiResponse.ServerError)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(id);
  }

  @ApiTags('ADMIN')
  @ApiOperation(SwaggerApiOperation.UpdateByUuid)
  @ApiResponse(SwaggerApiResponse.UpdatedByUuid)
  @ApiResponse(SwaggerApiResponse.ValidationError)
  @ApiResponse(SwaggerApiResponse.UnauthorizedAdmin)
  @ApiResponse(SwaggerApiResponse.NotFound)
  @ApiResponse(SwaggerApiResponse.DublicateError)
  @ApiResponse(SwaggerApiResponse.ServerErrorAndTransaction)
  @ApiBearerAuth('access-token')
  @UseGuards(IsAdministratorGuard)
  @UseGuards(VerifyAccessTokenGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateItemDto) {
    return this.itemsService.update(id, dto);
  }

  @ApiTags('ADMIN')
  @ApiOperation(SwaggerApiOperation.UpdateByUuid)
  @ApiResponse(SwaggerApiResponse.UpdatedByUuid)
  @ApiResponse(SwaggerApiResponse.ValidationError)
  @ApiResponse(SwaggerApiResponse.UnauthorizedAdmin)
  @ApiResponse(SwaggerApiResponse.NotFound)
  @ApiResponse(SwaggerApiResponse.DublicateError)
  @ApiResponse(SwaggerApiResponse.ServerErrorAndTransaction)
  @ApiBearerAuth('access-token')
  @UseGuards(IsAdministratorGuard)
  @UseGuards(VerifyAccessTokenGuard)
  @Put('bulk')
  updateBulk(@Body() dto: UpdateBulkItemDto) {
    return this.itemsService.updateBulk(dto.bulk);
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
    return this.itemsService.remove(id);
  }
}
