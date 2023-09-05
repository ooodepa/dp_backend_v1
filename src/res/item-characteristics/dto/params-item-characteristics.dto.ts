import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ParamsItemCharacteristics {
  @ApiProperty({
    required: false,
    default: 'xml',
    description: 'Например: `xml`, `json`.',
  })
  @IsOptional()
  @IsString()
  format: 'json' | 'xml' | string;
}
