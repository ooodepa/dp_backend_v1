import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BodyCreateTtnDto } from './dto/ttn.dto';
import { InvoiceService } from './invoice.service';
import { IsAdministratorGuard } from 'src/guards/IsAdministratorGuard.guard';
import { VerifyAccessTokenGuard } from 'src/guards/VerifyAccessTokenGuard.guard';
import { BodyCreateInventoryDto, ResponseGetInventoryDto } from './dto/inventory.dto';

@ApiTags('api_v1_invoice')
@Controller('/api/v1/invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @ApiTags('any')
  @ApiResponse({status: 200, type: ResponseGetInventoryDto})
  @Get('x/warehouses/x/inventory-items')
  getInventoryItems(@Res() res) {
    return this.invoiceService.getInventory(res);
  }

  @ApiTags('ADMIN')
  @ApiBearerAuth('access-token')
  @UseGuards(IsAdministratorGuard)
  @UseGuards(VerifyAccessTokenGuard)
  @Post('x/warehouses/:warehouse/inventory-items')
  createInventoryItems(
    @Res() res,
    @Param('warehouse') warehouseId: string,
    @Body() body: BodyCreateInventoryDto,
  ) {
    return this.invoiceService.createBulkInventory(res, body, +warehouseId);
  }

  @ApiTags('ADMIN')
  @ApiBearerAuth('access-token')
  @UseGuards(IsAdministratorGuard)
  @UseGuards(VerifyAccessTokenGuard)
  @Post('x/ttn/new')
  createTtn(@Res() res, @Body() body: BodyCreateTtnDto) {
    return this.invoiceService.createTtn(res, body);
  }

  @ApiTags('ADMIN')
  @ApiBearerAuth('access-token')
  @UseGuards(IsAdministratorGuard)
  @UseGuards(VerifyAccessTokenGuard)
  @Get('x/warehouses/x/ttn')
  getTTN(@Res() res) {
    return this.invoiceService.getTTN(res);
  }

  @ApiTags('ADMIN')
  @ApiBearerAuth('access-token')
  @UseGuards(IsAdministratorGuard)
  @UseGuards(VerifyAccessTokenGuard)
  @Get('x/warehouses/x/ttn/:id')
  getTTNbyId(@Res() res, @Param('id') ttnId: string) {
    return this.invoiceService.getTTNbyId(res, ttnId);
  }

  @ApiTags('ADMIN')
  @ApiBearerAuth('access-token')
  @UseGuards(IsAdministratorGuard)
  @UseGuards(VerifyAccessTokenGuard)
  @Delete('x/warehouses/x/ttn/:id')
  deleteTTNbyId(@Res() res, @Param('id') ttnId: string) {
    return this.invoiceService.getTTNbyId(res, ttnId);
  }
}
