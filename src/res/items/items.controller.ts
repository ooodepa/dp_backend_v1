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

import GetItemDto from './dto/get-item.dto';
import ItemsApiProperty from './items.swagger';
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
import SwaggerApiResponse from 'src/utils/Swagger/SwaggerApiResponse';
import SwaggerApiOperation from 'src/utils/Swagger/SwaggerApiOperation';
import { IsAdministratorGuard } from 'src/guards/IsAdministratorGuard.guard';
import { VerifyAccessTokenGuard } from 'src/guards/VerifyAccessTokenGuard.guard';

@ApiTags('api_v1_items')
@Controller('/api/v1/items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

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
  @ApiResponse({
    status: HttpStatus.OK,
    description: `Получили список записей\n\n
Пример XML:\n\n
- \`<?xml version="1.0" encoding="UTF-8"?>\`
- \`<ARRAY>\`
  - \`<OBJECT>\`
    - \`<dp_id>${ItemsApiProperty.dp_id.example}</dp_id>\`
    - \`<dp_itemCategoryId>${ItemsApiProperty.dp_itemCategoryId.example}</dp_itemCategoryId>\`
    - \`<dp_name>${ItemsApiProperty.dp_name.example}</dp_name>\`
    - \`<dp_photoUrl>${ItemsApiProperty.dp_photoUrl.example}</dp_photoUrl>\`
    - \`<dp_model>${ItemsApiProperty.dp_model.example}</dp_model>\`
    - \`<dp_seoKeywords>${ItemsApiProperty.dp_seoKeywords.example}</dp_seoKeywords>\`
    - \`<dp_seoDescription>${ItemsApiProperty.dp_seoDescription.example}</dp_seoDescription>\`
    - \`<dp_isHidden>${ItemsApiProperty.dp_isHidden.example}</dp_isHidden>\`
    - Массив характеристик:
      - \`<dp_itemCharacteristics>\`
        - \`<dp_id></dp_id>\`
        - \`<dp_itemId></dp_itemId>\`
        - \`<dp_characteristicId></dp_characteristicId>\`
        - \`<dp_value></dp_value>\`
      - \`</dp_itemCharacteristics>\`
      - \`<dp_itemCharacteristics>\`
        - \`<!-- Второй элемент массива по аналогии -->\`
      - \`</dp_itemCharacteristics>\`
    - Галерея картинок:
      - \`<dp_itemGalery>\`
        - \`<dp_id></dp_id>\`
        - \`<dp_itemId></dp_itemId>\`
        - \`<dp_photoUrl></dp_photoUrl>\`
      - \`</dp_itemGalery>\`
      - \`<dp_itemGalery>\`
        - \`<!-- Второй элемент массива по аналогии -->\`
      - \`</dp_itemGalery>\`
  - \`</OBJECT>\`
  - \`<OBJECT>\`
    - \`<!-- Аналогично как и первый элемент массива -->\`
  - \`</OBJECT>\`
- \`</ARRAY>\``,
    type: [GetItemDto],
  })
  @ApiResponse(SwaggerApiResponse.ServerErrorAndTransaction)
  @Get()
  findAll(@Query() filter: FilterItemDto, @Res() res: Response) {
    return this.itemsService.findAll(filter, res);
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
