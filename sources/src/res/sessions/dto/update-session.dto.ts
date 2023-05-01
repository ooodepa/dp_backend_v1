import { ApiProperty } from '@nestjs/swagger';

export class UpdateSessionResponseDto {
  @ApiProperty({ example: 'token' })
  dp_accessToken: string;
}
