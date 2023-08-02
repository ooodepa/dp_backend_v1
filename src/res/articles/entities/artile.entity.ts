import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { LstArticleAttachedLinks } from './article-attached-links.entity';

@Entity('DP_DOC_Articles')
export class ArticleEntity {
  @PrimaryGeneratedColumn('uuid')
  dp_id: string;

  @Index('UNI_docArticles_name', { unique: true })
  @Column()
  dp_name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP()' })
  dp_date: Date;

  @Column({ default: '' })
  dp_photoUrl: string;

  @Column({ default: '', length: 8192 })
  dp_text: string;

  @OneToMany(
    () => LstArticleAttachedLinks,
    (e: LstArticleAttachedLinks) => e.dp_articleId,
  )
  @JoinColumn({ name: 'dp_id' })
  dp_articleAttachedLinks: LstArticleAttachedLinks[];

  @Index('UNI_docArticles_urlSegment', { unique: true })
  @Column()
  dp_urlSegment: string;

  @Column({ default: 10000 })
  dp_sortingIndex: number;

  @Column({ default: '' })
  dp_seoKeywords: string;

  @Index('UNI_docArticles_seoDescription', { unique: true })
  @Column({ default: '' })
  dp_seoDescription: string;

  @Column({ default: false })
  dp_isHidden: boolean;
}
