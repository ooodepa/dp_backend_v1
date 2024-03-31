import { ApiProperty } from '@nestjs/swagger';
import HttpResponse from './HttpResponse.dto';

class PaginationDto {
  @ApiProperty()
  current_page: number;

  @ApiProperty()
  last_page: number;

  @ApiProperty()
  total_entities: number;

  @ApiProperty()
  limit_entities: number;

  @ApiProperty()
  skip_entities: number;
}
export default class HttpResponsePagination extends HttpResponse {
  @ApiProperty({ type: PaginationDto })
  pagination: PaginationDto;
}
