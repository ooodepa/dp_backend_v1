import * as path from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { OrdersService } from './orders.service';
import { UsersModule } from '../users/users.module';
import { OrderEntity } from './entities/order.entity';
import { OrdersController } from './orders.controller';
import { ItemEntity } from '../items/entities/item.entity';
import { UserEntity } from '../users/entities/user.entity';
import { OrderItemsEntity } from './entities/order-items.entity';
import { SessionEntity } from '../sessions/entities/session.entity';
import { ActivationAccountEntity } from '../users/entities/activation-account.entity';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      OrderItemsEntity,
      ActivationAccountEntity,
      SessionEntity,
      ItemEntity,
      UserEntity,
    ]),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('APP__EMAIL_HOST'),
          port: configService.get<number>('APP__EMAIL_PORT'),
          auth: {
            user: configService.get<string>('APP__EMAIL_USER'),
            pass: configService.get<string>('APP__EMAIL_PASS'),
          },
        },
        defaults: {
          from: `"Server" <${configService.get<string>('APP__EMAIL_USER')}>`,
        },
        template: {
          dir: path.join(__dirname, '../..', 'templates'),
          adapter: new HandlebarsAdapter(),
        },
      }),
    }),
    UsersModule,
  ],
})
export class OrdersModule {}
