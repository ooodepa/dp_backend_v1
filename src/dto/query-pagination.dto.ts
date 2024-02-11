import { ApiProperty } from '@nestjs/swagger';

export default class QueryPaginationDto {
  @ApiProperty({ required: false })
  page: number;

  @ApiProperty({ required: false })
  limit: number;
}
