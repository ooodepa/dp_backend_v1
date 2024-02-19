import * as path from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './res/users/users.module';
import { SessionsModule } from './res/sessions/sessions.module';
import { ItemCategoriesModule } from './res/item-categories/item-categories.module';
import { ItemCharacteristicsModule } from './res/item-characteristics/item-characteristics.module';
import { ItemsModule } from './res/items/items.module';
import { ArticlesModule } from './res/articles/articles.module';
import { ContactTypesModule } from './res/contact-types/contact-types.module';
import { HelpersModule } from './res/helpers/helpers.module';
import { ItemBrandsModule } from './res/item-brands/item-brands.module';
import { RolesModule } from './res/roles/roles.module';
import { OrdersModule } from './res/orders/orders.module';
import { ApkVersionsModule } from './res/apk-versions/apk-versions.module';
import { FavoriteItemsModule } from './res/favorite-items/favorite-items.module';
import { ManagerModule } from './res/manager/manager.module';
import { OrderStatusesModule } from './res/order-statuses/order-statuses.module';
import { PortalNalogGovByModule } from './res/portal-nalog-gov-by/portal-nalog-gov-by.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [path.join('dist', '**', '*.entity.js')],
      logging: true,
      // logger: 'file',
      synchronize: false,
    }),
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
  ],
})
export class AppModule {}
