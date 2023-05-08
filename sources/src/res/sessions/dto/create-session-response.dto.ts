import { ApiProperty } from '@nestjs/swagger';

import SessionsApiProperty from '../sessions.swagger';

export class CreateSessionResponseDto {
  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty(SessionsApiProperty.dp_accessToken)
  dp_accessToken: string;

  @ApiProperty(SessionsApiProperty.dp_refreshToken)
  dp_refreshToken: string;
}
