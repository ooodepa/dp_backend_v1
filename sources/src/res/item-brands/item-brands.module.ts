import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '../users/users.module';
import { ItemBrandsService } from './item-brands.service';
import { RoleEntity } from '../roles/entities/role.entity';
import { ItemBrandEntity } from './entities/item-brand.entity';
import { ItemBrandsController } from './item-brands.controller';
import { SessionEntity } from '../sessions/entities/session.entity';
import { UserRolesEntity } from '../roles/entities/user-role.entity';
import { ActivationAccountEntity } from '../users/entities/activation-account.entity';

@Module({
  controllers: [ItemBrandsController],
  providers: [ItemBrandsService],
  imports: [
    TypeOrmModule.forFeature([
      ItemBrandEntity,
      UserRolesEntity,
      RoleEntity,
      ActivationAccountEntity,
      SessionEntity,
    ]),
    UsersModule,
  ],
})
export class ItemBrandsModule {}
