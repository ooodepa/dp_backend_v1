import { ApiProperty } from '@nestjs/swagger';

import SessionsApiProperty from '../sessions.swagger';

export default class GetSessionDto {
  @ApiProperty(SessionsApiProperty.dp_id)
  dp_id: number;

  @ApiProperty(SessionsApiProperty.dp_date)
  dp_date: string;

  @ApiProperty(SessionsApiProperty.dp_ip)
  dp_ip: string;

  @ApiProperty(SessionsApiProperty.dp_agent)
  dp_agent: string;
}
