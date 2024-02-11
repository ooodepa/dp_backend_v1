import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LanguageEntity } from './language.entity';

@Entity('ph_ctl_seo_pages')
export class SeoPageEntity {
  @PrimaryGeneratedColumn('uuid')
  ph_id: string;

  @Index('ph_uni_ctl_seo_pages_1c_code', { unique: true })
  @Column()
  ph_1c_code: string;

  @Index('ph_uni_ctl_seo_pages_1c_name', { unique: true })
  @Column()
  ph_1c_name: string;

  @Index('ph_uni_ctl_seo_pages_html_title', { unique: true })
  @Column()
  ph_html_title: string;

  @Index('ph_uni_ctl_seo_pages_html_description', { unique: true })
  @Column({ length: 2048 })
  ph_html_description: string;

  @Column({ length: 2048 })
  ph_html_keywords: string;

  @Index('ph_uni_ctl_sitemap_loc', { unique: true })
  @Column({ length: 2048 })
  ph_sitemap_loc: string;

  @Column({ type: 'timestamp' })
  ph_sitemap_lastmod: string;

  @Column({ length: 16 })
  ph_sitemap_changefreq: string;

  @Column({ type: 'float' })
  ph_sitemap_priority: number;

  @Column({ type: 'text' })
  ph_rich_content: string;

  @ManyToOne(() => LanguageEntity, (e: LanguageEntity) => e.ph_id, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'ph_language_id' })
  @Column({ nullable: true, default: null })
  ph_language_id: number;
}
