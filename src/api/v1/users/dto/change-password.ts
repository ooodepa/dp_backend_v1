import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({ example: 'secret123' })
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  dp_oldPassword: string;

  @ApiProperty({ example: 'secret321' })
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  dp_newPassword: string;
}
