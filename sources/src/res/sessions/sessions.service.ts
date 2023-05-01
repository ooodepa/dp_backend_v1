import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { SessionEntity } from './entities/session.entity';
import { UserEntity } from '../users/entities/user.entity';
import { CreateSessionDto } from './dto/create-session.dto';
import HttpResponse from 'src/utils/HttpResponseDto/HttpResponse';
import { UpdateSessionResponseDto } from './dto/update-session.dto';
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

  async logout(req: Request) {
    const accessToken = await this.usersService.getBearerToken(req);
    const payload = await this.usersService.getAccessTokenFromRequest(req);

    await this.sessionEntity.delete({
      dp_accessToken: accessToken,
      dp_userId: payload.id,
    });

    return HttpResponse.successDeleted();
  }

  async findAll(req): Promise<SessionEntity[]> {
    // const accessToken = await this.usersService.getBearerToken(req);
    const payload = await this.usersService.getAccessTokenFromRequest(req);
    const userId = payload.id;

    return await this.sessionEntity.find({
      select: ['dp_id', 'dp_date', 'dp_ip', 'dp_agent'],
      where: {
        dp_userId: userId,
        // dp_accessToken: Not(accessToken),
      },
      order: { dp_date: 'DESC' },
    });
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
