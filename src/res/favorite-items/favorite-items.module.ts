import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '../users/users.module';
import { FavoriteItemsService } from './favorite-items.service';
import { SessionEntity } from '../sessions/entities/session.entity';
import { FavoriteItemEntity } from './entities/favorite-item.entity';
import { FavoriteItemsController } from './favorite-items.controller';
import { ActivationAccountEntity } from '../users/entities/activation-account.entity';

@Module({
  controllers: [FavoriteItemsController],
  providers: [FavoriteItemsService],
  imports: [
    TypeOrmModule.forFeature([
      FavoriteItemEntity,
      ActivationAccountEntity,
      SessionEntity,
    ]),
    UsersModule,
  ],
})
export class FavoriteItemsModule {}
