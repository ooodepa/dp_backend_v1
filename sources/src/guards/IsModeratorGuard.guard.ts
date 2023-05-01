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
import { RoleEntity } from 'src/res/roles/entities/role.entity';
import { UserRolesEntity } from 'src/res/roles/entities/user-role.entity';

@Injectable()
export class IsModeratorGuard implements CanActivate {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(RoleEntity)
    private readonly roleEntity: Repository<RoleEntity>,
    @InjectRepository(UserRolesEntity)
    private readonly userRolesEntity: Repository<UserRolesEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const payload = await this.usersService.getAccessTokenFromRequest(req);
    const userId = payload.id;

    const adminRole = await this.roleEntity.findOne({
      where: { dp_name: 'MODER' },
    });

    if (!adminRole) {
      const message = 'В БД не создана роль модератора';
      const status = HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(message, status);
    }

    const candidate = await this.userRolesEntity.findOne({
      where: {
        dp_userId: userId,
        dp_roleId: adminRole.dp_id,
      },
    });

    if (!candidate) {
      const message = 'У пользователя нет роли модератора';
      const status = HttpStatus.UNAUTHORIZED;
      throw new HttpException(message, status);
    }

    return true;
  }
}
