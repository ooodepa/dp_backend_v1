import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, HttpStatus, Param } from '@nestjs/common';

import GetUnpDto from './dto/get-unp.dto';
import { PortalNalogGovByService } from './portal-nalog-gov-by.service';

@ApiTags('api_v1_portal-nalog-gov-by')
@Controller('api/v1/portal-nalog-gov-by')
export class PortalNalogGovByController {
  constructor(
    private readonly portalNalogGovByService: PortalNalogGovByService,
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    type: GetUnpDto,
  })
  @Get(':unp')
  findOne(@Param('unp') id: string) {
    return this.portalNalogGovByService.findOne(id);
  }
}
