import ApiPaginationResponse from 'src/types/ApiResponse/ApiPaginationResponse.dto';
import ItemDto from './item.dto';
import { ApiProperty } from '@nestjs/swagger';

export default class FindAllPaginationResponseDto extends ApiPaginationResponse {
  @ApiProperty({ type: [ItemDto] })
  data: ItemDto[];
}
