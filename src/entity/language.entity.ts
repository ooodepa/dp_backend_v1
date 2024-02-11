import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ph_ctl_languages')
export class LanguageEntity {
  @PrimaryGeneratedColumn()
  ph_id: number;

  @Index('uni_ctl_languages_1c_code', { unique: true })
  @Column({ length: 8 })
  ph_1c_code: string;

  @Index('uni_ctl_languages_1c_description', { unique: true })
  @Column({ length: 16 })
  ph_1c_description: string;
}
