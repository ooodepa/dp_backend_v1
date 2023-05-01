import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class ContactTypeCreateDto {
  @Exclude()
  dp_id: number;

  @ApiProperty({ example: 'whatsapp' })
  @IsNotEmpty()
  @IsString()
  dp_name: string;
}
