import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user123' })
  @MaxLength(64, { message: 'Логин не может быть больше 64 символов' })
  @MinLength(4, { message: 'Логин не может быть меньше 4 символов' })
  @IsNotEmpty({ message: 'Логин не указан' })
  @IsString({ message: 'Логин не имеет тип "строка"' })
  dp_login: string;

  @ApiProperty({ example: 'user123@example.com' })
  @IsEmail()
  @MaxLength(64, {
    message: 'Электронная почта не может быть больше 64 символов',
  })
  @IsNotEmpty({ message: 'Электронная почта не указана' })
  @IsString({ message: 'Электронная почта не имеет тип "строка"' })
  dp_email: string;

  @ApiProperty({ example: 'secret123' })
  @IsNotEmpty({ message: 'Пароль не указан' })
  @IsString({ message: 'Пароль не имеет тип "строка"' })
  dp_password: string;

  dp_passwordHash: string;

  @ApiProperty({ example: '1234567890123' })
  @MinLength(9, { message: 'УНП не может быть меньше 9 символов' })
  @IsNotEmpty({ message: 'УНП не указано' })
  @IsString({ message: 'УНП не имеет тип "строка"' })
  dp_unp: string;

  @ApiProperty({
    example: 'Частное торгово-производственное унитарное предприятие "Иванов"',
  })
  @IsNotEmpty({ message: 'Наименование юридического лица не указано' })
  @IsString({ message: 'Наименование юридического лица не имеет тип "строка"' })
  dp_nameLegalEntity: string;

  @ApiProperty({ example: 'Частное предприятие "Иванов"' })
  @IsNotEmpty({ message: 'Краткое наименование юридического лица не указано' })
  @IsString({
    message: 'Краткое наименование юридического лица не имеет тип "строка"',
  })
  dp_shortNameLegalEntity: string;

  @ApiProperty({
    example:
      '224017, Беларусь, Брестская обл., г. Брест, ул. Московская, д. 267',
  })
  @IsNotEmpty({ message: 'Адрес не указан' })
  @IsString({ message: 'Адрес не имеет тип "строка"' })
  dp_address: string;

  @ApiProperty({ example: '+375331112233' })
  @IsPhoneNumber()
  @IsNotEmpty({ message: 'Телефон не указан' })
  @IsString({ message: 'Телефон не имеет тип "строка"' })
  dp_receptionPhone: string;

  @ApiProperty({ example: 'Иван' })
  @MinLength(3, { message: 'Имя не может быть меньше 3 символов' })
  @IsNotEmpty({ message: 'Имя не указано' })
  @IsString({ message: 'Имя не имеет тип "строка"' })
  dp_firstName: string;

  @ApiProperty({ example: 'Иванович' })
  @MinLength(3, { message: 'Фамилия не может быть меньше 3 символов' })
  @IsNotEmpty({ message: 'Фамилия не указана' })
  @IsString({ message: 'Фамилия не имеет тип "строка"' })
  dp_lastName: string;

  @ApiProperty({ example: 'Иванов' })
  @IsString({ message: 'Отчество не имеет тип "строка"' })
  dp_middleName: string;
}
