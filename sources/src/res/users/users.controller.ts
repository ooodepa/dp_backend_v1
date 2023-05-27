import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  UseGuards,
  Req,
  HttpStatus,
  Res,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';

import GetUserDto from './dto/get-user.dto';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangeEmailDto } from './dto/change-email.dto';
import { ChangePasswordDto } from './dto/change-password';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import { IsManagerGuard } from 'src/guards/IsManagerGuard.guard';
import CreateUserResponseDto from './dto/create-user-response.dto';
import SwaggerApiResponse from 'src/utils/Swagger/SwaggerApiResponse';
import HttpResponseDto from 'src/utils/HttpResponseDto/HttpResponseDto.dto';
import { IsAdministratorGuard } from 'src/guards/IsAdministratorGuard.guard';
import { VerifyAccessTokenGuard } from 'src/guards/VerifyAccessTokenGuard.guard';

@ApiTags('api_v1_users')
@Controller('/api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiTags('any')
  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description:
      'Пользователь зарегистрирован и пользователю пришло на почту ссылка подтверждения.',
    type: CreateUserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description:
      'Логин занят другим пользователем. \n\n' +
      'E-mail занят другим пользователем. \n\n',
    type: HttpResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description:
      'Транзация не совершена, так как не удалось отправить письмо с ссылкой активации на почту. \n\n' +
      'Что-то пошло не так на сервере. \n\n',
    type: HttpResponseDto,
  })
  @Post()
  createUser(@Body() createUserDto: CreateUserDto, @Req() req) {
    return this.usersService.createUser(createUserDto, req);
  }

  @ApiTags('any')
  @ApiOperation({ summary: 'Получить информацию о профиле' })
  @ApiResponse({
    description: 'Получили информацию о пользователе',
    type: GetUserDto,
  })
  @ApiResponse(SwaggerApiResponse.Unauthorized)
  @ApiResponse(SwaggerApiResponse.NotFound)
  @ApiResponse(SwaggerApiResponse.ServerError)
  @ApiBearerAuth('access-token')
  @UseGuards(VerifyAccessTokenGuard)
  @Get()
  findOne(@Req() req) {
    return this.usersService.findOne(req);
  }

  @ApiTags('any')
  @ApiOperation({ summary: 'Активация аккаунта' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Пользователь подтвердил зарегистрированный аккаунт.',
    type: HttpResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description:
      'Ссылка не действительна, так как прошло 24 часа (токен просрочен). \n\n' +
      'Ссылка не действительна, так как токен поддельный (токен не прошел проверку валидности). \n\n' +
      'Ссылка не действительна, так как токен не зарегстрирован в БД (токен прошел проверку, но его нет в БД). \n\n' +
      'Ссылка не действительна, так как аккаунт был активирован. \n\n',
    type: HttpResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description:
      'Не совершено обновление статуса пользователя. \n\n' +
      'Что-то пошло не так на сервере. \n\n',
    type: HttpResponseDto,
  })
  @Get('/activate-account/:token')
  activateAccount(@Param('token') token: string) {
    return this.usersService.activateAccount(token);
  }

  @ApiTags('user')
  @ApiOperation({
    summary: 'Запрос на смену электронной почты на новую электронную почту',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      'Заявка отправлена на новую почту и предупреждение отправлено на старую почту.',
    type: HttpResponseDto,
  })
  @ApiResponse(SwaggerApiResponse.Unauthorized)
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Новая почта совпадает с текущей.',
    type: HttpResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.TOO_MANY_REQUESTS,
    description:
      'Cлишком много запросов о смене электроной почты за не прошедшие 3 часа.',
    type: HttpResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description:
      'Транзация не совершена, так как нет таблицы в БД (не сохранения запись о смене старой электронной почты на новую). \n\n' +
      'Транзация не совершена, так как не отправлено письмо на новую и старую почту. \n\n' +
      'Что-то пошло не так на сервере. \n\n',
    type: HttpResponseDto,
  })
  @ApiBearerAuth('access-token')
  @UseGuards(VerifyAccessTokenGuard)
  @Patch('/change-email')
  updateEmail(@Body() changeEmailDto: ChangeEmailDto, @Req() req) {
    return this.usersService.updateEmail(changeEmailDto, req);
  }

  @ApiTags('any')
  @ApiOperation({ summary: 'Подтверждаем смену на новую электронную почту' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Электронная почта изменена',
    type: HttpResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description:
      'Ссылка не действительна, так как прошло 3 часа (токен просрочен). \n\n' +
      'Ссылка не действительна, так как токен подделан (токен не прошел валидацию). \n\n' +
      'Ссылка не действительна, так как токена не зарегистрирован в БД. \n\n' +
      'Ссылка не действительна, так как почта была сменена, либо заявка на смену почты была отклонена. \n\n',
    type: HttpResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description:
      'Транзация не совернеша (заявка не отмечена закрытой, пользователю не поменял email на новый). \n\n' +
      'Что-то пошло не так на сервере. \n\n',
    type: HttpResponseDto,
  })
  @Get('/change-email/:token/confirm')
  confirmChangeEmail(@Param('token') token) {
    return this.usersService.confirmChangeEmail(token);
  }

  @ApiTags('any')
  @ApiOperation({ summary: 'Отменяем смену на новую электронную почту' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Заявка на смену электронной почты отменена.',
    type: HttpResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description:
      'Cсылка не действительна, так как прошло 3 часа (токен просрочен). \n\n' +
      'Cсылка не действительна, так как токен подделан (токен не прошел валидацию). \n\n' +
      'Ссылка не действительна, так как токен не зарегистрирован в БД. \n\n' +
      'Ссылка не действительна, так как почта была сменена, либо заявка на смену почты была отклонена. \n\n',
    type: HttpResponseDto,
  })
  @ApiResponse(SwaggerApiResponse.ServerError)
  @Get('/change-email/:token/delete')
  deleteChangeEmail(@Param('token') token) {
    return this.usersService.deleteChangeEmail(token);
  }

  @ApiTags('any')
  @ApiOperation({ summary: 'Забыли пароль' })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      'На электронную почту отправлен логин и новый сгенерированный пароль',
    type: HttpResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Пользователя с такой электронной почтой не существует',
    type: HttpResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description:
      'Транзация не совернеша, так как сгенерированный пароль не записался в БД. \n\n' +
      'Транзация не совернеша, так как письмо с логином и паролем не отправлено на электронную почту. \n\n' +
      'Что-то пошло не так на сервере. \n\n',
    type: HttpResponseDto,
  })
  @Post('/forget-password')
  forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
    return this.usersService.forgetPassword(forgetPasswordDto);
  }

  @ApiTags('user')
  @ApiOperation({ summary: 'Меняем пароль' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Пароль изменен',
    type: HttpResponseDto,
  })
  @ApiResponse(SwaggerApiResponse.Unauthorized)
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Не тот старый пароль',
    type: HttpResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description:
      'Транзация не совернеша, так как новый пароль не записан в БД. \n\n' +
      'Транзация не совернеша, так как не удалось завершить все сессии. \n\n' +
      'Что-то пошло не так на сервере. \n\n',
    type: HttpResponseDto,
  })
  @ApiBearerAuth('access-token')
  @UseGuards(VerifyAccessTokenGuard)
  @Patch('/change-password')
  updatePassword(@Body() changePasswordDto: ChangePasswordDto, @Req() req) {
    return this.usersService.updatePassword(changePasswordDto, req);
  }

  @ApiTags('ADMIN')
  @ApiOperation({ summary: 'Проверка роли админа' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'У пользователя роль администратора',
  })
  @ApiResponse(SwaggerApiResponse.UnauthorizedAdmin)
  @ApiResponse(SwaggerApiResponse.ServerError)
  @ApiBearerAuth('access-token')
  @UseGuards(IsAdministratorGuard)
  @UseGuards(VerifyAccessTokenGuard)
  @Post('is-admin')
  checkIsAdmin(@Res() res: Response) {
    const status = HttpStatus.OK;
    const data: HttpResponseDto = {
      statusCode: status,
      message: 'Вы администратор',
    };
    return res.status(status).json(data);
  }

  @ApiTags('MANAGER')
  @ApiOperation({ summary: 'Проверка роли менеджера' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'У пользователя роль менеджера',
  })
  @ApiResponse(SwaggerApiResponse.UnauthorizedAdmin)
  @ApiResponse(SwaggerApiResponse.ServerError)
  @ApiBearerAuth('access-token')
  @UseGuards(IsManagerGuard)
  @UseGuards(VerifyAccessTokenGuard)
  @Post('is-manager')
  checkIsManager(@Res() res: Response) {
    const status = HttpStatus.OK;
    const data: HttpResponseDto = {
      statusCode: status,
      message: 'Вы менеджер',
    };
    return res.status(status).json(data);
  }
}
