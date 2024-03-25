import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceService } from './invoice.service';
import { UsersModule } from '../users/users.module';
import { InvoiceController } from './invoice.controller';
import { UserEntity } from '../users/entities/user.entity';
import { RoleEntity } from '../roles/entities/role.entity';
import { ItemEntity } from '../items/entities/item.entity';
import { InvoicePlusEntity } from './entities/invoice-plus.entity';
import { SessionEntity } from '../sessions/entities/session.entity';
import { UserRolesEntity } from '../roles/entities/user-role.entity';
import { InvoiceMinusEntity } from './entities/invoice-minus.entity';
import { LstInvoicePlusItemsEntity } from './entities/lst-invoice-plus-items.entity';
import { ActivationAccountEntity } from '../users/entities/activation-account.entity';
import { LstInvoiceMinusItemsEntity } from './entities/lst-invoice-minus-items.entity';

@Module({
  controllers: [InvoiceController],
  providers: [InvoiceService],
  imports: [
    TypeOrmModule.forFeature([
      ItemEntity,
      InvoicePlusEntity,
      InvoiceMinusEntity,
      LstInvoicePlusItemsEntity,
      LstInvoiceMinusItemsEntity,
      SessionEntity,
      UserEntity,
      UserRolesEntity,
      RoleEntity,
      ActivationAccountEntity,
    ]),
    UsersModule,
  ],
})
export class InvoiceModule {}
