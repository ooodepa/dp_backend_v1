import * as bcrypt from 'bcryptjs';
import { Response } from 'express';
import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import GetSessionsDto from './dto/get-sessions.dto';
import { UsersService } from '../users/users.service';
import { SessionEntity } from './entities/session.entity';
import { UserEntity } from '../users/entities/user.entity';
import { CreateSessionDto } from './dto/create-session.dto';
import HttpResponse from 'src/utils/HttpResponseDto/HttpResponse';
import { UpdateSessionResponseDto } from './dto/update-session.dto';
import HttpResponseDto from 'src/utils/HttpResponseDto/HttpResponseDto.dto';
import { CreateSessionResponseDto } from './dto/create-session-response.dto';

@Injectable()
export class SessionsService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(SessionEntity)
    private readonly sessionEntity: Repository<SessionEntity>,
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
  ) {}

  async create(
    createSessionDto: CreateSessionDto,
    req,
  ): Promise<CreateSessionResponseDto> {
    const candidate = await this.userEntity.findOne({
      where: [
        { dp_login: createSessionDto.emailOrLogin },
        { dp_email: createSessionDto.emailOrLogin },
      ],
    });

    if (!candidate) {
      const message = 'Нет пользователя с таким логином или электронной почтой';
      const status = HttpStatus.CONFLICT;
      throw new HttpException(message, status);
    }

    const str = createSessionDto.dp_password;
    const hash = candidate.dp_passwordHash;
    const isVerifyPassword = await bcrypt.compare(str, hash);

    if (!isVerifyPassword) {
      const message = 'Не тот пароль';
      const status = HttpStatus.CONFLICT;
      throw new HttpException(message, status);
    }

    const userId = candidate.dp_id;

    const ip = `${
      req?.headers['x-forwarded-for'] || req?.connection.remoteAddress
    }`;

    const agent = `${req?.headers['user-agent']}`;

    const access = await this.usersService.generateToken({
      id: userId,
      type: 'access',
    });
    const refresh = await this.usersService.generateToken({
      id: userId,
      type: 'refresh',
    });

    await this.sessionEntity.save({
      dp_accessToken: access,
      dp_refreshToken: refresh,
      dp_ip: ip,
      dp_agent: agent,
      dp_userId: userId,
    });

    return {
      statusCode: 201,
      message: 'Вы авторизовались',
      dp_accessToken: access,
      dp_refreshToken: refresh,
    };
  }

  async logout(req: Request, res: Response) {
    const accessToken = await this.usersService.getBearerToken(req);
    const payload = await this.usersService.getAccessTokenFromRequest(req);

    await this.sessionEntity.delete({
      dp_accessToken: accessToken,
      dp_userId: payload.id,
    });

    const status = HttpStatus.OK;
    const data: HttpResponseDto = {
      statusCode: status,
      message: 'Вы вышли из аккаунта',
    };
    return res.status(status).json(data);
  }

  async findAll(req): Promise<GetSessionsDto> {
    const payload = await this.usersService.getAccessTokenFromRequest(req);
    const userId = payload.id;

    const accessToken = await this.usersService.getBearerToken(req);
    const currentSession = await this.sessionEntity.findOne({
      select: ['dp_id', 'dp_date', 'dp_ip', 'dp_agent'],
      where: {
        dp_userId: userId,
        dp_accessToken: accessToken,
      },
    });

    const otherSessions = await this.sessionEntity.find({
      select: ['dp_id', 'dp_date', 'dp_ip', 'dp_agent'],
      where: {
        dp_userId: userId,
        dp_accessToken: Not(accessToken),
      },
      order: { dp_date: 'DESC' },
    });

    return {
      dp_current: {
        dp_id: currentSession.dp_id,
        dp_date: currentSession.dp_date,
        dp_ip: currentSession.dp_ip,
        dp_agent: currentSession.dp_agent,
      },
      dp_other: otherSessions.map((e) => ({
        dp_id: e.dp_id,
        dp_date: e.dp_date,
        dp_ip: e.dp_ip,
        dp_agent: e.dp_agent,
      })),
    };
  }

  async update(req): Promise<UpdateSessionResponseDto> {
    const refreshToken = this.usersService.getBearerToken(req);
    const payload = await this.usersService.getRefreshTokenFromRequest(req);
    const userId = payload.id;

    const accessToken = await this.usersService.generateToken({
      id: userId,
      type: 'access',
    });

    await this.sessionEntity.update(
      { dp_refreshToken: refreshToken, dp_userId: userId },
      { dp_accessToken: accessToken },
    );

    return {
      dp_accessToken: accessToken,
    };
  }

  async remove(id: number, req) {
    const payload = await this.usersService.getAccessTokenFromRequest(req);
    const userId = payload.id;

    await this.sessionEntity.delete({
      dp_id: id,
      dp_userId: userId,
    });

    return HttpResponse.successDeleted();
  }

  async removeAll(req) {
    const payload = await this.usersService.getAccessTokenFromRequest(req);
    const userId = payload.id;

    await this.sessionEntity.delete({
      dp_userId: userId,
    });

    return HttpResponse.successDeleted();
  }
}
