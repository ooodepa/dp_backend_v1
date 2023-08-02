import { ApiProperty } from '@nestjs/swagger';

class CreateUserResponseDto {
  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty({ example: 'jwt' })
  dp_accessToken: string;

  @ApiProperty({ example: 'jwt' })
  dp_refreshToken: string;
}

export default CreateUserResponseDto;
