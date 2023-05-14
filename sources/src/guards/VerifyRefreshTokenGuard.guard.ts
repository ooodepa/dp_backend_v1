import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  HttpStatus,
} from '@nestjs/common';
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
    const refreshToken = this.usersService.getBearerToken(req);

    await this.usersService.verifyToken(refreshToken, 'refresh');

    const candidate = await this.sessionEntity.findOne({
      where: { dp_refreshToken: refreshToken },
    });

    if (!candidate) {
      const message = 'Нет сеанса с таким токеном обновления';
      const status = HttpStatus.UNAUTHORIZED;
      throw new HttpException(message, status);
    }
    return true;
  }
}
