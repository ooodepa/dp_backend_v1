import { ApiProperty } from '@nestjs/swagger';

export class FilterItemDto {
  @ApiProperty({
    required: false,
  })
  fields: string;

  @ApiProperty({
    required: false,
  })
  page: number;

  @ApiProperty({
    required: false,
  })
  limit: number;
}
