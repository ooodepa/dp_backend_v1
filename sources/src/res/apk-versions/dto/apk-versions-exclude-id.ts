import { Exclude } from 'class-transformer';

import ApkVersionsDto from './apk-versions.dto';

export default class ApkVersionsExcludeIdDto extends ApkVersionsDto {
  @Exclude()
  dp_id: number;
}
