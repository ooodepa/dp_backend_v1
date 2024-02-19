import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ItemsService } from './items.service';
import { ItemEntity } from './entities/item.entity';
import { UsersModule } from '../users/users.module';
import { ItemsController } from './items.controller';
import { RoleEntity } from '../roles/entities/role.entity';
import { SessionEntity } from '../sessions/entities/session.entity';
import { LstItemGaleryEntity } from './entities/item-galery.entity';
import { UserRolesEntity } from '../roles/entities/user-role.entity';
import { ItemBrandEntity } from '../item-brands/entities/item-brand.entity';
import { LstItemCharacteristicEntity } from './entities/item-characteristics.entity';
import { ItemCategoryEntity } from '../item-categories/entities/item-category.entity';
import { ActivationAccountEntity } from '../users/entities/activation-account.entity';

@Module({
  controllers: [ItemsController],
  providers: [ItemsService],
  imports: [
    TypeOrmModule.forFeature([
      ItemEntity,
      ItemBrandEntity,
      LstItemCharacteristicEntity,
      LstItemGaleryEntity,
      ItemCategoryEntity,
      UserRolesEntity,
      RoleEntity,
      ActivationAccountEntity,
      SessionEntity,
    ]),
    UsersModule,
  ],
})
export class ItemsModule {}
