import { ApiProperty } from '@nestjs/swagger';
import PaginationDto from './Pagination.dto';
import AppApiResponseDto from './ApiResponse.dto';

export default class AppApiPaginationResponse extends AppApiResponseDto {
  @ApiProperty({ type: PaginationDto })
  pagination: PaginationDto;
}
