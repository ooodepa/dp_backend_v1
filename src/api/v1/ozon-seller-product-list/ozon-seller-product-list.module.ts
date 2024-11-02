import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { RoleEntity } from '../roles/entities/role.entity';
import { SessionEntity } from '../sessions/entities/session.entity';
import { UserRolesEntity } from '../roles/entities/user-role.entity';
import { OzonSellerProductListService } from './ozon-seller-product-list.service';
import { OzonSellerProductListController } from './ozon-seller-product-list.controller';
import { OzonSellerProductInfoEntity } from './entities/ozon-seller-product-info.entity';
import { OzonSellerProductListEntity } from './entities/ozon-seller-product-list.entity';

@Module({
  controllers: [OzonSellerProductListController],
  providers: [OzonSellerProductListService],
  imports: [
    TypeOrmModule.forFeature([
      OzonSellerProductListEntity,
      OzonSellerProductInfoEntity,
      SessionEntity,
      RoleEntity,
      UserRolesEntity,
    ]),
    ConfigModule,
    UsersModule,
  ],
})
export class OzonSellerProductListModule {}
