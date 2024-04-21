import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty } from 'class-validator';

export default class FindAllByVendorsDto {
  @ArrayNotEmpty()
  @ApiProperty({ type: [String] })
  vendors: string[];
}
