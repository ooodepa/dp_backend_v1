import { ApiProperty } from '@nestjs/swagger';

import SessionsApiProperty from '../sessions.swagger';
import HttpResponseDto from 'src/utils/HttpResponseDto/HttpResponseDto.dto';

class GetSessionDto {
  @ApiProperty(SessionsApiProperty.dp_id)
  dp_id: number;

  @ApiProperty(SessionsApiProperty.dp_date)
  dp_date: Date;

  @ApiProperty(SessionsApiProperty.dp_ip)
  dp_ip: string;

  @ApiProperty(SessionsApiProperty.dp_agent)
  dp_agent: string;
}

export default class GetSessionsDto extends HttpResponseDto {
  @ApiProperty()
  dp_current: GetSessionDto;

  @ApiProperty({ type: [GetSessionDto] })
  dp_other: GetSessionDto[];
}
