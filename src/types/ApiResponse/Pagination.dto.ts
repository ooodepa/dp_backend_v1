import { ApiProperty } from '@nestjs/swagger';

export default class PaginationDto {
  @ApiProperty()
  current_page: number;

  @ApiProperty()
  last_page: number;

  @ApiProperty()
  limit_items: number;

  @ApiProperty()
  skip_items: number;

  @ApiProperty()
  total_items: number;
}
