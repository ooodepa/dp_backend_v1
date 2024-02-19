import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import HttpResponse from 'src/utils/HttpResponseDto/HttpResponse';
import { FavoriteItemEntity } from './entities/favorite-item.entity';

@Injectable()
export class FavoriteItemsService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(FavoriteItemEntity)
    private readonly favoriteItemEntity: Repository<FavoriteItemEntity>,
  ) {}

  async like(id: string, req: Request) {
    const payload = await this.usersService.getAccessTokenFromRequest(req);

    const candidate = await this.favoriteItemEntity.findOne({
      where: {
        dp_itemId: id,
        dp_userId: payload.id,
      },
    });

    if (candidate) {
      const message = 'Эта номенклатура уже добавлена в избранные';
      const status = HttpStatus.CONFLICT;
      throw new HttpException(message, status);
    }

    await this.favoriteItemEntity.save({
      dp_itemId: id,
      dp_userId: payload.id,
    });
    return HttpResponse.successCreate();
  }

  async findAll(req: Request) {
    const payload = await this.usersService.getAccessTokenFromRequest(req);
    return await this.favoriteItemEntity.find({
      where: { dp_userId: payload.id },
    });
  }

  async unLike(id: string, req: Request) {
    const payload = await this.usersService.getAccessTokenFromRequest(req);
    await this.favoriteItemEntity.findOneOrFail({
      where: {
        dp_itemId: id,
        dp_userId: payload.id,
      },
    });
    await this.favoriteItemEntity.delete({
      dp_itemId: id,
      dp_userId: payload.id,
    });
    return HttpResponse.successDeleted;
  }
}
