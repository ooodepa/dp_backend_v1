import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import ApkVersionsApiProperty from '../apk-versions.swagger';

export default class ApkVersionsNoId {
  @Exclude()
  dp_id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty(ApkVersionsApiProperty.dp_date)
  dp_date: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty(ApkVersionsApiProperty.dp_version)
  dp_version: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty(ApkVersionsApiProperty.dp_url)
  dp_url: string;
}
