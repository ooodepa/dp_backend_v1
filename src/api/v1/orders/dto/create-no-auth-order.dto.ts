import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class OrderItemDto {
  @ApiProperty({ example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' })
  dp_itemId: string;

  @ApiProperty({ example: 1 })
  dp_count: number;
}

export class CreateNoAuthOrderDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Имя не указано' })
  @IsString({ message: 'Имя не имеет тип "строка"' })
  dp_name: string;

  @ApiProperty()
  @IsEmail()
  @MaxLength(64, {
    message: 'Электронная почта не может быть больше 64 символов',
  })
  @IsNotEmpty({ message: 'Электронная почта не указана' })
  @IsString({ message: 'Электронная почта не имеет тип "строка"' })
  dp_email: string;

  @ApiProperty()
  @ApiProperty({ example: '+375331112233' })
  @IsPhoneNumber()
  @IsNotEmpty({ message: 'Телефон не указан' })
  @IsString({ message: 'Телефон не имеет тип "строка"' })
  dp_phone: string;

  @ApiProperty({ type: [OrderItemDto] })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => OrderItemDto)
  dp_orderItems: OrderItemDto[];
}
