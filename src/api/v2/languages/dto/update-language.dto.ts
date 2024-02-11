import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLanguageDto {
  @IsString()
  @Expose()
  @ApiProperty()
  ph_1c_code: string;

  @IsString()
  @Expose()
  @ApiProperty()
  ph_1c_description: string;
}
