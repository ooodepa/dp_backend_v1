import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import ApkVersionsApiProperty from '../apk-versions.swagger';
import ApkVersionsExcludeIdDto from './apk-versions-exclude-id';

export default class ApkVersionsWithIdDto extends ApkVersionsExcludeIdDto {
  @IsNumber()
  @ApiProperty(ApkVersionsApiProperty.dp_id)
  dp_id: number;
}
