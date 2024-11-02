import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { IsAdministratorGuard } from 'src/guards/IsAdministratorGuard.guard';
import { VerifyAccessTokenGuard } from 'src/guards/VerifyAccessTokenGuard.guard';
import { OzonSellerProductListService } from './ozon-seller-product-list.service';

@ApiTags('api-ozon-seller')
@Controller('/api/v1/ozon-seller/products')
export class OzonSellerProductListController {
  constructor(
    private readonly ozonSellerProductListService: OzonSellerProductListService,
  ) {}

  @Get('list-products')
  findAll__ListProducts() {
    return this.ozonSellerProductListService.getListProducts();
  }

  @Get('info-products')
  findAll__InfoProducts() {
    return this.ozonSellerProductListService.getInfoProducts();
  }

  @ApiBearerAuth('access-token')
  @UseGuards(IsAdministratorGuard)
  @UseGuards(VerifyAccessTokenGuard)
  @Get('list-products/online-parsing')
  onlineParsing__ListProducts() {
    return this.ozonSellerProductListService.fetchProductList__All();
  }

  @ApiBearerAuth('access-token')
  @UseGuards(IsAdministratorGuard)
  @UseGuards(VerifyAccessTokenGuard)
  @Get('info-products/online-parsing')
  onlineParsing__InfoProducts() {
    return this.ozonSellerProductListService.fetchProductInfo__Array();
  }

  @ApiBearerAuth('access-token')
  @UseGuards(IsAdministratorGuard)
  @UseGuards(VerifyAccessTokenGuard)
  @Get('list-products/online-parsing/get-converted')
  onlineParsing__ConvertedListProducts() {
    return this.ozonSellerProductListService.fetchConvertedProductList__All();
  }

  @ApiBearerAuth('access-token')
  @UseGuards(IsAdministratorGuard)
  @UseGuards(VerifyAccessTokenGuard)
  @Get('info-products/online-parsing/get-converted')
  onlineParsing__ConvertedInfoProducts() {
    return this.ozonSellerProductListService.fetchConvertedProductInfo__Array();
  }

  @ApiBearerAuth('access-token')
  @UseGuards(IsAdministratorGuard)
  @UseGuards(VerifyAccessTokenGuard)
  @Get('list-products/online-parsing/update-db')
  onlineParsing__ConvertedListProductsUpdateDatabase() {
    return this.ozonSellerProductListService.updateProductList();
  }

  @ApiBearerAuth('access-token')
  @UseGuards(IsAdministratorGuard)
  @UseGuards(VerifyAccessTokenGuard)
  @Get('info-products/online-parsing/update-db')
  onlineParsing__ConvertedInfoProductsUpdateDatabase() {
    return this.ozonSellerProductListService.updateProductInfo();
  }
}
