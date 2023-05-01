import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
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
    const accessToken = this.usersService.getBearerToken(req);

    const candidate = await this.sessionEntity.findOne({
      where: { dp_accessToken: accessToken },
    });

    if (!candidate) {
      const message = 'Нет сеанса с таким токеном доступа';
      const status = HttpStatus.UNAUTHORIZED;
      throw new HttpException(message, status);
    }

    return true;
  }
}
