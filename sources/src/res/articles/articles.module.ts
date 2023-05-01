import { Module } from '@nestjs/common';
import { ArticleEntity } from './entities/artile.entity';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { ArticlesService } from './articles.service';
import { RoleEntity } from '../roles/entities/role.entity';
import { ArticlesController } from './articles.controller';
import { SessionEntity } from '../sessions/entities/session.entity';
import { UserRolesEntity } from '../roles/entities/user-role.entity';
import { LstArticleAttachedLinks } from './entities/article-attached-links.entity';
import { ActivationAccountEntity } from '../users/entities/activation-account.entity';

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService],
  imports: [
    TypeOrmModule.forFeature([
      ArticleEntity,
      LstArticleAttachedLinks,
      UserRolesEntity,
      RoleEntity,
      ActivationAccountEntity,
      SessionEntity,
    ]),
    UsersModule,
  ],
})
export class ArticlesModule {}
