import {
  Controller,
  Get,
  Post,
  Req,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import GetFavoriteItemDto from './dto/get-favorite-item.dto';
import { FavoriteItemsService } from './favorite-items.service';
import SwaggerApiResponse from 'src/utils/Swagger/SwaggerApiResponse';
import SwaggerApiOperation from 'src/utils/Swagger/SwaggerApiOperation';
import { VerifyAccessTokenGuard } from 'src/guards/VerifyAccessTokenGuard.guard';

@ApiTags('api_v1_favorite-items')
@Controller('/api/v1/favorite-items')
export class FavoriteItemsController {
  constructor(private readonly favoriteItemsService: FavoriteItemsService) {}

  @ApiTags('user')
  @ApiOperation(SwaggerApiOperation.Create)
  @ApiResponse(SwaggerApiResponse.Created)
  @ApiResponse(SwaggerApiResponse.Unauthorized)
  @ApiResponse(SwaggerApiResponse.ServerError)
  @ApiBearerAuth('access-token')
  @UseGuards(VerifyAccessTokenGuard)
  @Post(':itemId')
  like(@Param('itemId') id: string, @Req() req) {
    return this.favoriteItemsService.like(id, req);
  }

  @ApiTags('user')
  @ApiOperation(SwaggerApiOperation.Find)
  @ApiResponse({ ...SwaggerApiResponse.Finded, type: [GetFavoriteItemDto] })
  @ApiResponse(SwaggerApiResponse.ServerError)
  @ApiBearerAuth('access-token')
  @UseGuards(VerifyAccessTokenGuard)
  @Get()
  findAll(@Req() req) {
    return this.favoriteItemsService.findAll(req);
  }

  @ApiTags('user')
  @ApiOperation(SwaggerApiOperation.DeleteById)
  @ApiResponse(SwaggerApiResponse.DeletedById)
  @ApiResponse(SwaggerApiResponse.Unauthorized)
  @ApiResponse(SwaggerApiResponse.NotFound)
  @ApiResponse(SwaggerApiResponse.ServerError)
  @ApiBearerAuth('access-token')
  @UseGuards(VerifyAccessTokenGuard)
  @Delete(':itemId')
  unLike(@Param('itemId') id: string, @Req() req) {
    return this.favoriteItemsService.unLike(id, req);
  }
}
