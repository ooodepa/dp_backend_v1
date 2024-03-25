import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InvoiceService } from './invoice.service';
import { CreateInvoicePlusDto } from './dto/invoice-plus.dto';
import { CreateInvoiceMinusDto } from './dto/invoice-minus.dto';
import { IsAdministratorGuard } from 'src/guards/IsAdministratorGuard.guard';
import { VerifyAccessTokenGuard } from 'src/guards/VerifyAccessTokenGuard.guard';

@ApiTags('api_v1_invoice')
@Controller('/api/v1/invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @ApiTags('ADMIN')
  @ApiBearerAuth('access-token')
  @UseGuards(IsAdministratorGuard)
  @UseGuards(VerifyAccessTokenGuard)
  @Post('plus')
  createPlus(@Body() createInvoiceDto: CreateInvoicePlusDto) {
    return this.invoiceService.createPlus(createInvoiceDto);
  }

  @ApiTags('ADMIN')
  @ApiBearerAuth('access-token')
  @UseGuards(IsAdministratorGuard)
  @UseGuards(VerifyAccessTokenGuard)
  @Post('minus')
  createMinus(@Body() createInvoiceDto: CreateInvoiceMinusDto) {
    return this.invoiceService.createMinus(createInvoiceDto);
  }

  @ApiTags('any')
  @Get('plus')
  findAllPlus() {
    return this.invoiceService.findAllPlus();
  }

  @ApiTags('any')
  @Get('minus')
  findAllMinus() {
    return this.invoiceService.findAllMinus();
  }

  @ApiTags('any')
  @Get('report/stock')
  getStock() {
    return this.invoiceService.getStock();
  }

  @ApiTags('any')
  @Get('plus/:id')
  findOnePlus(@Param('id') id: string) {
    return this.invoiceService.findOnePlus(id);
  }

  @ApiTags('any')
  @Get('minus/:id')
  findOneMinus(@Param('id') id: string) {
    return this.invoiceService.findOneMinus(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
  //   return this.invoiceService.update(+id, updateInvoiceDto);
  // }

  @ApiTags('ADMIN')
  @ApiBearerAuth('access-token')
  @UseGuards(IsAdministratorGuard)
  @UseGuards(VerifyAccessTokenGuard)
  @Delete('plus/:id')
  removePlus(@Param('id') id: string) {
    return this.invoiceService.removePlus(id);
  }

  @ApiTags('ADMIN')
  @ApiBearerAuth('access-token')
  @UseGuards(IsAdministratorGuard)
  @UseGuards(VerifyAccessTokenGuard)
  @Delete('minus/:id')
  removeMinus(@Param('id') id: string) {
    return this.invoiceService.removeMinus(id);
  }
}
