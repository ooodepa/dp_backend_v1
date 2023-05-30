import { ApiProperty } from '@nestjs/swagger';

import SessionsApiProperty from '../sessions.swagger';
import HttpResponseDto from 'src/utils/HttpResponseDto/HttpResponseDto.dto';

export class UpdateSessionResponseDto extends HttpResponseDto {
  @ApiProperty(SessionsApiProperty.dp_accessToken)
  dp_accessToken: string;
}
