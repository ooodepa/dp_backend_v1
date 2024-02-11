import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateLanguageDto } from './update-language.dto';

export default class UpdateLanguageWithIdDto extends UpdateLanguageDto {
  @Expose()
  @ApiProperty()
  ph_id: number;
}
