import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { ArticleEntity } from './artile.entity';

@Entity('DP_LST_ArticleAttachedLinks')
export class LstArticleAttachedLinks {
  @PrimaryGeneratedColumn()
  dp_id: number;

  @ApiProperty({ example: 'Каталог 2023' })
  @Column()
  dp_name: string;

  @ApiProperty({ example: 'https://example.com/catalogs/catalog-2023.pdf' })
  @Column()
  dp_url: string;

  @ApiProperty()
  @ManyToOne(() => ArticleEntity, (e: ArticleEntity) => e.dp_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'dp_articleId' })
  @Column()
  dp_articleId: string;
}
