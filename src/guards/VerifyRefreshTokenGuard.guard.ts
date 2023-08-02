import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  HttpStatus,
} from '@nestjs/common';
import { SHA256 } from 'crypto-js';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SessionEntity } from 'src/res/sessions/entities/session.entity';

import { UsersService } from 'src/res/users/users.service';

@Injectable()
export class VerifyRefreshTokenGuard implements CanActivate {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(SessionEntity)
    private readonly sessionEntity: Repository<SessionEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const payload = await this.usersService.getRefreshTokenFromRequest(req);
    const refreshToken = this.usersService.getBearerToken(req);

    await this.usersService.verifyToken(refreshToken, 'refresh');

    const sessions = await this.sessionEntity.find({
      select: { dp_refreshHash: true },
      where: { dp_userId: payload.id },
    });

    const hash1 = SHA256(refreshToken).toString();

    for (let i = 0; i < sessions.length; ++i) {
      const hash2 = sessions[i].dp_refreshHash;
      if (hash1 === hash2) {
        req.custom__refreshHash = hash2;
        req.custom__userId = payload.id;
        return true;
      }
    }

    const message = 'Нет сеанса с таким токеном обновления';
    const status = HttpStatus.UNAUTHORIZED;
    throw new HttpException(message, status);
  }
}
