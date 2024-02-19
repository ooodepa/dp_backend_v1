import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '../users/users.module';
import { SessionsService } from './sessions.service';
import { SessionEntity } from './entities/session.entity';
import { SessionsController } from './sessions.controller';
import { UserEntity } from '../users/entities/user.entity';
import { ActivationAccountEntity } from '../users/entities/activation-account.entity';

@Module({
  controllers: [SessionsController],
  providers: [SessionsService],
  imports: [
    TypeOrmModule.forFeature([
      SessionEntity,
      UserEntity,
      ActivationAccountEntity,
    ]),
    UsersModule,
  ],
})
export class SessionsModule {}
