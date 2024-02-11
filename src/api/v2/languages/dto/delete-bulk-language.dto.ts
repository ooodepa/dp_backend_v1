import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import DeleteLanguageWithIdDto from './delete-language-with-id.dto';

export default class DeleteBulkLanguageDto {
  @Type(() => DeleteLanguageWithIdDto)
  @Expose()
  @ApiProperty({ type: [DeleteLanguageWithIdDto] })
  bulk: DeleteLanguageWithIdDto[];
}
