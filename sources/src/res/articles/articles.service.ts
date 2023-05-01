import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ArticleEntity } from './entities/artile.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import HttpResponse from 'src/utils/HttpResponseDto/HttpResponse';
import HttpExceptions from 'src/utils/HttpResponseDto/HttpException';
import { LstArticleAttachedLinks } from './entities/article-attached-links.entity';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(ArticleEntity)
    private readonly articleEntity: Repository<ArticleEntity>,
  ) {}

  async create(dto: CreateArticleDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const savedItem = await queryRunner.manager
        .getRepository(ArticleEntity)
        .save(dto);

      const uuid = savedItem.dp_id;

      dto.dp_articleAttachedLinks.forEach((e) => {
        e.dp_articleId = uuid;
      });

      await queryRunner.manager
        .getRepository(LstArticleAttachedLinks)
        .insert(dto.dp_articleAttachedLinks);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      HttpExceptions.exceptionTransaction(err);
    } finally {
      await queryRunner.release();
    }

    return HttpResponse.successTransactionCreate();
  }

  async createBulk(bulk: CreateArticleDto[]) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      for (let i = 0; i < bulk.length; ++i) {
        const savedItem = await queryRunner.manager
          .getRepository(ArticleEntity)
          .save(bulk[i]);

        const uuid = savedItem.dp_id;

        bulk[i].dp_articleAttachedLinks.forEach((e) => {
          e.dp_articleId = uuid;
        });

        await queryRunner.manager
          .getRepository(LstArticleAttachedLinks)
          .insert(bulk[i].dp_articleAttachedLinks);
      }

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      HttpExceptions.exceptionTransaction(err);
    } finally {
      await queryRunner.release();
    }

    return HttpResponse.successBulkCreate();
  }

  async findAll() {
    return await this.articleEntity.find({
      order: { dp_date: 'ASC' },
    });
  }

  async findOneByUrl(url: string) {
    await this.articleEntity.findOneOrFail({ where: { dp_urlSegment: url } });
    return await this.articleEntity.findOne({
      where: { dp_urlSegment: url },
      relations: ['dp_articleAttachedLinks'],
    });
  }

  async findOne(id: string) {
    await this.articleEntity.findOneOrFail({ where: { dp_id: id } });
    return await this.articleEntity.findOne({
      where: { dp_id: id },
      relations: ['dp_articleAttachedLinks'],
    });
  }

  async update(uuid: string, dto: UpdateArticleDto) {
    await this.articleEntity.findOneOrFail({ where: { dp_id: uuid } });

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      dto.dp_id = uuid;

      await queryRunner.manager
        .getRepository(LstArticleAttachedLinks)
        .delete({ dp_articleId: uuid });

      await queryRunner.manager.getRepository(ArticleEntity).save(dto);

      dto.dp_articleAttachedLinks.forEach((e) => {
        e.dp_articleId = uuid;
      });

      await queryRunner.manager
        .getRepository(LstArticleAttachedLinks)
        .insert(dto.dp_articleAttachedLinks);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      HttpExceptions.exceptionTransaction(err);
    } finally {
      await queryRunner.release();
    }

    return HttpResponse.successTransactionUpdate();
  }

  async remove(id: string) {
    await this.articleEntity.findOneOrFail({ where: { dp_id: id } });
    this.articleEntity.delete(id);
  }
}
