import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSessionDto {
  @ApiProperty({ example: 'user123@example.com' })
  @IsNotEmpty()
  @IsString()
  emailOrLogin: string;

  @ApiProperty({ example: 'secret123' })
  @IsNotEmpty()
  @IsString()
  dp_password: string;
}
