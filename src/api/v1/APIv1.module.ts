import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SessionsModule } from './sessions/sessions.module';
import { ItemCategoriesModule } from './item-categories/item-categories.module';
import { ItemCharacteristicsModule } from './item-characteristics/item-characteristics.module';
import { ItemsModule } from './items/items.module';
import { ArticlesModule } from './articles/articles.module';
import { ContactTypesModule } from './contact-types/contact-types.module';
import { HelpersModule } from './helpers/helpers.module';
import { ItemBrandsModule } from './item-brands/item-brands.module';
import { RolesModule } from './roles/roles.module';
import { OrdersModule } from './orders/orders.module';
import { ApkVersionsModule } from './apk-versions/apk-versions.module';
import { FavoriteItemsModule } from './favorite-items/favorite-items.module';
import { ManagerModule } from './manager/manager.module';
import { OrderStatusesModule } from './order-statuses/order-statuses.module';
import { PortalNalogGovByModule } from './portal-nalog-gov-by/portal-nalog-gov-by.module';
import { InvoiceModule } from './invoice/invoice.module';

@Module({
  imports: [
    UsersModule,
    SessionsModule,
    ItemCategoriesModule,
    ItemCharacteristicsModule,
    ItemsModule,
    ArticlesModule,
    ContactTypesModule,
    HelpersModule,
    ItemBrandsModule,
    RolesModule,
    OrdersModule,
    ApkVersionsModule,
    FavoriteItemsModule,
    ManagerModule,
    OrderStatusesModule,
    PortalNalogGovByModule,
    InvoiceModule,
  ],
})
export class APIv1 {}
