import { ApiProperty } from '@nestjs/swagger';

export default class HttpResponse {
  @ApiProperty()
  code: number;

  @ApiProperty()
  status: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  response: any;
}
