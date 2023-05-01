import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '../users/users.module';
import { RoleEntity } from '../roles/entities/role.entity';
import { SessionEntity } from '../sessions/entities/session.entity';
import { UserRolesEntity } from '../roles/entities/user-role.entity';
import { ItemCharacteristicsService } from './item-characteristics.service';
import { ItemCharacteristicEntity } from './entities/item-characteristic.entity';
import { ItemCharacteristicsController } from './item-characteristics.controller';
import { ActivationAccountEntity } from '../users/entities/activation-account.entity';

@Module({
  controllers: [ItemCharacteristicsController],
  providers: [ItemCharacteristicsService],
  imports: [
    TypeOrmModule.forFeature([
      ItemCharacteristicEntity,
      UserRolesEntity,
      RoleEntity,
      ActivationAccountEntity,
      SessionEntity,
    ]),
    UsersModule,
  ],
})
export class ItemCharacteristicsModule {}
