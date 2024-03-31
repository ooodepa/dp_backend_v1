import HttpResponsePagination from 'src/dto/HttpResponsePagination.dto';
import ItemWithIdDto from './item-with-id.dto';
import { ApiProperty } from '@nestjs/swagger';

export default class GetItemDto extends HttpResponsePagination {
  @ApiProperty({ type: [ItemWithIdDto] })
  response: ItemWithIdDto[];
}
