import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HelpersService } from './helpers.service';
import { UsersModule } from '../users/users.module';
import { HelperEntity } from './entities/helper.entity';
import { HelpersController } from './helpers.controller';
import { RoleEntity } from '../roles/entities/role.entity';
import { SessionEntity } from '../sessions/entities/session.entity';
import { UserRolesEntity } from '../roles/entities/user-role.entity';
import { ActivationAccountEntity } from '../users/entities/activation-account.entity';
import { LstHelperCommunicationTypeEntity } from './entities/LstHelperCommunicationTypeEntity.entity';

@Module({
  controllers: [HelpersController],
  providers: [HelpersService],
  imports: [
    TypeOrmModule.forFeature([
      HelperEntity,
      LstHelperCommunicationTypeEntity,
      UserRolesEntity,
      RoleEntity,
      ActivationAccountEntity,
      SessionEntity,
    ]),
    UsersModule,
  ],
})
export class HelpersModule {}
