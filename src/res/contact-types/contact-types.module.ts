import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '../users/users.module';
import { RolesModule } from '../roles/roles.module';
import { RoleEntity } from '../roles/entities/role.entity';
import { ContactTypesService } from './contact-types.service';
import { ContactTypeEntity } from './entities/contact-type.entity';
import { SessionEntity } from '../sessions/entities/session.entity';
import { ContactTypesController } from './contact-types.controller';
import { UserRolesEntity } from '../roles/entities/user-role.entity';
import { ActivationAccountEntity } from '../users/entities/activation-account.entity';

@Module({
  controllers: [ContactTypesController],
  providers: [ContactTypesService],
  imports: [
    TypeOrmModule.forFeature([
      ContactTypeEntity,
      UserRolesEntity,
      RoleEntity,
      ActivationAccountEntity,
      SessionEntity,
    ]),
    UsersModule,
    RolesModule,
  ],
})
export class ContactTypesModule {}
