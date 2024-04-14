import { ApiProperty } from '@nestjs/swagger';

export default class FindAllPaginationDto {
  @ApiProperty({ required: false })
  page: number;

  @ApiProperty({ required: false })
  limit: number;

  @ApiProperty({ required: false })
  dp_1cParentId: string;
}
