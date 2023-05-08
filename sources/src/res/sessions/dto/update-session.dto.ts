import { ApiProperty } from '@nestjs/swagger';

import SessionsApiProperty from '../sessions.swagger';

export class UpdateSessionResponseDto {
  @ApiProperty(SessionsApiProperty.dp_accessToken)
  dp_accessToken: string;
}
