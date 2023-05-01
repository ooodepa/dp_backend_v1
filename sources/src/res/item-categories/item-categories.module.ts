import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '../users/users.module';
import { RoleEntity } from '../roles/entities/role.entity';
import { ItemCategoriesService } from './item-categories.service';
import { SessionEntity } from '../sessions/entities/session.entity';
import { ItemCategoryEntity } from './entities/item-category.entity';
import { UserRolesEntity } from '../roles/entities/user-role.entity';
import { ItemCategoriesController } from './item-categories.controller';
import { ItemBrandEntity } from '../item-brands/entities/item-brand.entity';
import { ActivationAccountEntity } from '../users/entities/activation-account.entity';

@Module({
  controllers: [ItemCategoriesController],
  providers: [ItemCategoriesService],
  imports: [
    TypeOrmModule.forFeature([
      ItemCategoryEntity,
      ItemBrandEntity,
      UserRolesEntity,
      RoleEntity,
      ActivationAccountEntity,
      SessionEntity,
    ]),
    UsersModule,
  ],
})
export class ItemCategoriesModule {}
