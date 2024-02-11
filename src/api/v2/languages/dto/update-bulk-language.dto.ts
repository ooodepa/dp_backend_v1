import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import UpdateLanguageWithIdDto from './update-language-with-id.dto';

export default class UpdateBulkLanguageDto {
  @Type(() => UpdateLanguageWithIdDto)
  @Expose()
  @ApiProperty({ type: [UpdateLanguageWithIdDto] })
  bulk: UpdateLanguageWithIdDto[];
}
