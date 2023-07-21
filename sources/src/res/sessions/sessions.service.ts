import * as bcrypt from 'bcryptjs';
import { SHA256 } from 'crypto-js';
import { Response } from 'express';
import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import GetSessionsDto from './dto/get-sessions.dto';
import { UsersService } from '../users/users.service';
import { SessionEntity } from './entities/session.entity';
import { UserEntity } from '../users/entities/user.entity';
import { CreateSessionDto } from './dto/create-session.dto';
import AppRequestDto from 'src/utils/AppRequest/AppRequestDto';
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

  async create(createSessionDto: CreateSessionDto, req, res: Response) {
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
    const isVerifyPassword = bcrypt.compareSync(str, hash);

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

    const accessTokenHash = SHA256(access).toString();
    const refreshTokenHash = SHA256(refresh).toString();

    await this.sessionEntity.save({
      dp_accessHash: accessTokenHash,
      dp_refreshHash: refreshTokenHash,
      dp_ip: ip,
      dp_agent: agent,
      dp_userId: userId,
    });

    const status = HttpStatus.CREATED;
    const data: CreateSessionResponseDto = {
      statusCode: status,
      message: 'Вы авторизовались',
      dp_accessToken: access,
      dp_refreshToken: refresh,
    };
    res.status(status).json(data);
  }

  async logout(req: AppRequestDto, res: Response) {
    await this.sessionEntity.delete({
      dp_accessHash: req.custom__accessHash,
      dp_userId: req.custom__userId,
    });

    const status = HttpStatus.OK;
    const data: HttpResponseDto = {
      statusCode: status,
      message: 'Вы вышли из аккаунта',
    };
    return res.status(status).json(data);
  }

  async findAll(req: AppRequestDto, res: Response) {
    const currentSession = await this.sessionEntity.findOne({
      select: ['dp_id', 'dp_date', 'dp_ip', 'dp_agent'],
      where: {
        dp_userId: req.custom__userId,
        dp_accessHash: req.custom__accessHash,
      },
    });

    const otherSessions = await this.sessionEntity.find({
      select: ['dp_id', 'dp_date', 'dp_ip', 'dp_agent'],
      where: {
        dp_userId: req.custom__userId,
        dp_accessHash: Not(req.custom__accessHash),
      },
      order: { dp_date: 'DESC' },
    });

    const status = HttpStatus.OK;
    const json: GetSessionsDto = {
      statusCode: status,
      message: 'Вы получили список сессий',
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
    res.status(status).json(json);
  }

  async update(req: AppRequestDto, res: Response) {
    const accessToken = await this.usersService.generateToken({
      id: req.custom__userId,
      type: 'access',
    });

    const accessTokenHash = SHA256(accessToken).toString();

    await this.sessionEntity.update(
      {
        dp_userId: req.custom__userId,
        dp_refreshHash: req.custom__refreshHash,
      },
      { dp_accessHash: accessTokenHash },
    );

    const status = HttpStatus.OK;
    const json: UpdateSessionResponseDto = {
      statusCode: status,
      message: 'Вы получили новый access токен',
      dp_accessToken: accessToken,
    };
    res.status(status).json(json);
  }

  async remove(id: number, req: AppRequestDto, res: Response) {
    await this.sessionEntity.findOneOrFail({
      where: {
        dp_id: id,
        dp_userId: req.custom__userId,
      },
    });

    await this.sessionEntity.delete({
      dp_id: id,
      dp_userId: req.custom__userId,
    });

    const status = HttpStatus.OK;
    const json: HttpResponseDto = {
      statusCode: status,
      message: 'Вы закрыли сессию по id',
    };
    res.status(status).json(json);
  }

  async removeAll(req: AppRequestDto, res: Response) {
    await this.sessionEntity.delete({
      dp_userId: req.custom__userId,
    });

    const status = HttpStatus.OK;
    const json: HttpResponseDto = {
      statusCode: status,
      message: 'Вы закрыли все сессии',
    };
    res.status(status).json(json);
  }
}
