import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ChangeEmailDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  dp_email: string;
}
