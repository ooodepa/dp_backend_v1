import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/api/v1/users/users.service';
import { RoleEntity } from 'src/api/v1/roles/entities/role.entity';
import { UserRolesEntity } from 'src/api/v1/roles/entities/user-role.entity';

@Injectable()
export class IsManagerGuard implements CanActivate {
  constructor(
    private readonly userService: UsersService,
    @InjectRepository(RoleEntity)
    private readonly roleEntity: Repository<RoleEntity>,
    @InjectRepository(UserRolesEntity)
    private readonly userRolesEntity: Repository<UserRolesEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const payload = await this.userService.getAccessTokenFromRequest(req);
    const userId = payload.id;

    const adminRole = await this.roleEntity.findOne({
      where: { dp_name: 'MANAGER' },
    });

    if (!adminRole) {
      const message = 'В БД не создана роль менеджера';
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
      const message = 'У пользователя нет роли менеджера';
      const status = HttpStatus.FORBIDDEN;
      throw new HttpException(message, status);
    }

    return true;
  }
}
