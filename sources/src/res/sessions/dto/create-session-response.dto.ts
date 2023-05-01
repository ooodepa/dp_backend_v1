import { ApiProperty } from '@nestjs/swagger';

export class CreateSessionResponseDto {
  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty({ example: 'token' })
  dp_accessToken: string;

  @ApiProperty({ example: 'token' })
  dp_refreshToken: string;
}
