import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import ApkVersionsNoId from './apk-versions-no-id';
import ApkVersionsApiProperty from '../apk-versions.swagger';

export default class ApkVersionsWithId extends ApkVersionsNoId {
  @IsNumber()
  @ApiProperty(ApkVersionsApiProperty.dp_id)
  dp_id: number;
}
