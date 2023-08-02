import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { SHA256 } from 'crypto-js';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UsersService } from 'src/res/users/users.service';
import { SessionEntity } from 'src/res/sessions/entities/session.entity';

@Injectable()
export class VerifyAccessTokenGuard implements CanActivate {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(SessionEntity)
    private readonly sessionEntity: Repository<SessionEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const payload = await this.usersService.getAccessTokenFromRequest(req);
    const accessToken = this.usersService.getBearerToken(req);

    await this.usersService.verifyToken(accessToken, 'access');

    const sessions = await this.sessionEntity.find({
      select: { dp_accessHash: true },
      where: { dp_userId: payload.id },
    });

    const hash1 = SHA256(accessToken).toString();

    for (let i = 0; i < sessions.length; ++i) {
      const hash2 = sessions[i].dp_accessHash;
      if (hash2 === hash1) {
        req.custom__accessHash = hash2;
        req.custom__userId = payload.id;
        return true;
      }
    }

    const message = 'Нет сеанса с таким токеном доступа';
    const status = HttpStatus.UNAUTHORIZED;
    throw new HttpException(message, status);
  }
}
