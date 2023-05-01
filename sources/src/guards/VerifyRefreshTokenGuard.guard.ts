import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { UsersService } from 'src/res/users/users.service';

@Injectable()
export class VerifyRefreshTokenGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    await this.usersService.getRefreshTokenFromRequest(req);
    return true;
  }
}
