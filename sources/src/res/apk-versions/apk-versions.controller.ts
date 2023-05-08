import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import GetApkVersionsDto from './dto/get-apk-versions.dto';
import { ApkVersionsService } from './apk-versions.service';
import SwaggerApiResponse from 'src/utils/Swagger/SwaggerApiResponse';
import SwaggerApiOperation from 'src/utils/Swagger/SwaggerApiOperation';

@ApiTags('api_v1_apk-versions')
@Controller('/api/v1/apk-versions')
export class ApkVersionsController {
  constructor(private readonly apkVersionsService: ApkVersionsService) {}

  @ApiOperation(SwaggerApiOperation.FindById)
  @ApiResponse({ ...SwaggerApiResponse.FindedById, type: GetApkVersionsDto })
  @ApiResponse(SwaggerApiResponse.ServerError)
  @Get('last')
  findLast() {
    return this.apkVersionsService.findLast();
  }
}
