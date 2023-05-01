import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { LstArticleAttachedLinks } from './article-attached-links.entity';

@Entity('DP_DOC_Articles')
export class ArticleEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  dp_id: string;

  @ApiProperty({ example: 'Каталоги' })
  @Column()
  dp_name: string;

  @ApiProperty({ example: '2023-04-13T05:00:00.000' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP()' })
  dp_date: Date;

  @ApiProperty({ example: 'catalogs' })
  @Column({ unique: true })
  dp_urlSegment: string;

  @ApiProperty({ example: 'https://example.com/image.png' })
  @Column({ default: '' })
  dp_photoUrl: string;

  @ApiProperty()
  @Column({ default: '' })
  dp_text: string;

  @ApiProperty()
  @Column({ default: '' })
  dp_seoKeywords: string;

  @ApiProperty()
  @Column({ default: '' })
  dp_seoDescription: string;

  @ApiProperty({ type: LstArticleAttachedLinks })
  @OneToMany(
    () => LstArticleAttachedLinks,
    (e: LstArticleAttachedLinks) => e.dp_articleId,
  )
  @JoinColumn({ name: 'dp_id' })
  dp_articleAttachedLinks: LstArticleAttachedLinks[];
}
