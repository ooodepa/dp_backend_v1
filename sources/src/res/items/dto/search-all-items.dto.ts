import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export default class SearchAllItemsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  search: string;
}
