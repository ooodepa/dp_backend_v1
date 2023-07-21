import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ArticleEntity } from './artile.entity';

@Entity('DP_LST_ArticleAttachedLinks')
export class LstArticleAttachedLinks {
  @PrimaryGeneratedColumn()
  dp_id: number;

  @ManyToOne(() => ArticleEntity, (e: ArticleEntity) => e.dp_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'dp_articleId' })
  @Column()
  dp_articleId: string;

  @Column()
  dp_name: string;

  @Column()
  dp_url: string;

  @Column()
  dp_photoUrl: string;
}
