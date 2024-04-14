import { ApiProperty } from '@nestjs/swagger';

export default class AppApiResponseDto {
  @ApiProperty()
  code: number;

  @ApiProperty()
  status: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  data: any;
}
