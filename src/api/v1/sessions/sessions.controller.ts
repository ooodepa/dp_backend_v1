import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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

import GetSessionsDto from './dto/get-sessions.dto';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionResponseDto } from './dto/update-session.dto';
import SwaggerApiResponse from 'src/utils/Swagger/SwaggerApiResponse';
import HttpResponseDto from 'src/utils/HttpResponseDto/HttpResponseDto.dto';
import { CreateSessionResponseDto } from './dto/create-session-response.dto';
import { VerifyAccessTokenGuard } from 'src/guards/VerifyAccessTokenGuard.guard';
import { VerifyRefreshTokenGuard } from 'src/guards/VerifyRefreshTokenGuard.guard';

@ApiTags('api_v1_sessions')
@Controller('/api/v1/sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @ApiTags('any')
  @ApiOperation({ summary: 'Аутентификация' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Пользователь авторизовался',
    type: CreateSessionResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description:
      'Нет пользователя с таким логином или электронной почтой. \n\n' +
      'Не тот пароль \n\n',
    type: HttpResponseDto,
  })
  @ApiResponse(SwaggerApiResponse.ServerError)
  @Post()
  create(@Body() createSessionDto: CreateSessionDto, @Req() req, @Res() res) {
    return this.sessionsService.create(createSessionDto, req, res);
  }

  @ApiTags('user')
  @ApiOperation({ summary: 'Выход с аккаунта' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Пользователь вышел с аккаунта',
    type: CreateSessionResponseDto,
  })
  @ApiResponse(SwaggerApiResponse.ServerError)
  @ApiBearerAuth('access-token')
  @UseGuards(VerifyAccessTokenGuard)
  @Post('logout')
  logout(@Req() req, @Res() res) {
    return this.sessionsService.logout(req, res);
  }

  @ApiTags('user')
  @ApiOperation({ summary: 'Получить список сессий' })
  @ApiResponse({ ...SwaggerApiResponse.Finded, type: GetSessionsDto })
  @ApiResponse(SwaggerApiResponse.Unauthorized)
  @ApiResponse(SwaggerApiResponse.ServerError)
  @ApiBearerAuth('access-token')
  @UseGuards(VerifyAccessTokenGuard)
  @Get()
  findAll(@Req() req, @Res() res) {
    return this.sessionsService.findAll(req, res);
  }

  @ApiTags('any')
  @ApiOperation({
    summary: 'Получить новый access токен (нужен refresh токен)',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Получили новый access токен.',
    type: UpdateSessionResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description:
      'Refresh токен просрочен \n\n' + 'Refresh токен не передан \n\n',
    type: HttpResponseDto,
  })
  @ApiResponse(SwaggerApiResponse.ServerError)
  @ApiBearerAuth('refresh-token')
  @UseGuards(VerifyRefreshTokenGuard)
  @Patch()
  update(@Req() req, @Res() res) {
    return this.sessionsService.update(req, res);
  }

  @ApiTags('user')
  @ApiOperation({ summary: 'Закрыть сессию по id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Закрыли сессию по id.',
    type: HttpResponseDto,
  })
  @ApiResponse(SwaggerApiResponse.Unauthorized)
  // @ApiResponse(SwaggerApiResponse.NotFound)
  @ApiResponse(SwaggerApiResponse.ServerError)
  @ApiBearerAuth('access-token')
  @UseGuards(VerifyAccessTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req, @Res() res) {
    return this.sessionsService.remove(+id, req, res);
  }

  @ApiTags('user')
  @ApiOperation({ summary: 'Закрыть все сессии' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Закрыли все сессии.',
    type: HttpResponseDto,
  })
  @ApiResponse(SwaggerApiResponse.Unauthorized)
  @ApiResponse(SwaggerApiResponse.ServerError)
  @ApiBearerAuth('access-token')
  @UseGuards(VerifyAccessTokenGuard)
  @Delete()
  removeAll(@Req() req, @Res() res) {
    return this.sessionsService.removeAll(req, res);
  }
}
