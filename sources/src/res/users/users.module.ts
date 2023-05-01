import * as path from 'path';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { UsersService } from './users.service';
import { ScheduleModule } from '@nestjs/schedule';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './users.controller';
import { ChangeEmailEntity } from './entities/change-email.entity';
import { SessionEntity } from '../sessions/entities/session.entity';
import { ActivationAccountEntity } from './entities/activation-account.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([
      UserEntity,
      ActivationAccountEntity,
      ChangeEmailEntity,
      SessionEntity,
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
    JwtModule.register({}),
  ],
  exports: [UsersService],
})
export class UsersModule {}
