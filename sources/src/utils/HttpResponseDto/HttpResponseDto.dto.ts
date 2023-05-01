import { ApiProperty } from '@nestjs/swagger';

class HttpResponseDto {
  @ApiProperty({ example: 0 })
  statusCode: number;

  @ApiProperty({ example: 'сообщение' })
  message: string;
}

export default HttpResponseDto;
