import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export default class DeleteLanguageWithIdDto {
  @Expose()
  @ApiProperty()
  ph_id: number;
}
