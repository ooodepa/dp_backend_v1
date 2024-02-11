import HttpResponseDto from './http-response.dto';

class PaginationDto {
  current_page: number;
  last_page: number;
  limit_items: number;
  skip_items: number;
  total_items: number;
}

export default class HttpPaginationResponseDto extends HttpResponseDto {
  pagination: PaginationDto;
}
