import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ForgetPasswordDto {
  @ApiProperty({ example: 'user123@example.com' })
  @IsNotEmpty()
  @IsString()
  emailOrLogin: string;
}
