import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceService } from './invoice.service';
import { UsersModule } from '../users/users.module';
import { InvoiceController } from './invoice.controller';
import { UserEntity } from '../users/entities/user.entity';
import { RoleEntity } from '../roles/entities/role.entity';
import { ItemEntity } from '../items/entities/item.entity';
import { SessionEntity } from '../sessions/entities/session.entity';
import { UserRolesEntity } from '../roles/entities/user-role.entity';
import { ActivationAccountEntity } from '../users/entities/activation-account.entity';
import { WarehousesEntity } from './entities/DP_CTL_Warehouses.entity';
import { CounterpartiesEntity } from './entities/DP_CTL_Сounterparties.entity';
import { TtnEntity } from './entities/DP_DOC_TTN.entity';
import { InventoryItemsEntity } from './entities/DP_LST_InventoryItems.entity';
import { LstTtnItemsEntity } from './entities/DP_LST_TtnItems.entity';

@Module({
  controllers: [InvoiceController],
  providers: [InvoiceService],
  imports: [
    TypeOrmModule.forFeature([
      ItemEntity,
      SessionEntity,
      UserEntity,
      UserRolesEntity,
      RoleEntity,
      ActivationAccountEntity,
      WarehousesEntity,
      CounterpartiesEntity,
      TtnEntity,
      InventoryItemsEntity,
      LstTtnItemsEntity,
    ]),
    UsersModule,
  ],
})
export class InvoiceModule {}
