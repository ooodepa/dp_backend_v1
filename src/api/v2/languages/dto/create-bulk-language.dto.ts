import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { CreateLanguageDto } from './create-language.dto';

export class CreateBulkLanguageDto {
  @Type(() => CreateLanguageDto)
  @Expose()
  @ApiProperty({ type: [CreateLanguageDto] })
  bulk: CreateLanguageDto[];
}
