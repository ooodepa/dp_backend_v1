import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ManagerService } from './manager.service';
import { UsersModule } from '../users/users.module';
import { ManagerController } from './manager.controller';
import { RoleEntity } from '../roles/entities/role.entity';
import { UserEntity } from '../users/entities/user.entity';
import { OrderEntity } from '../orders/entities/order.entity';
import { SessionEntity } from '../sessions/entities/session.entity';
import { UserRolesEntity } from '../roles/entities/user-role.entity';

@Module({
  controllers: [ManagerController],
  providers: [ManagerService],
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      RoleEntity,
      UserRolesEntity,
      SessionEntity,
      UserEntity,
    ]),
    UsersModule,
  ],
})
export class ManagerModule {}
