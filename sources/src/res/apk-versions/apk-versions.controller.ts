import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

import { ApkVersionsService } from './apk-versions.service';

@ApiTags('api_v1_apk-versions')
@Controller('/api/v1/apk-versions')
export class ApkVersionsController {
  constructor(private readonly apkVersionsService: ApkVersionsService) {}

  @Get('last')
  findLast() {
    return this.apkVersionsService.findLast();
  }
}
