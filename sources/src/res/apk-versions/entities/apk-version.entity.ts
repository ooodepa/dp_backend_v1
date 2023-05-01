import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('DP_DOC_ApkVersions')
export class ApkVersionEntity {
  @PrimaryGeneratedColumn()
  dp_id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP()' })
  dp_date: Date;

  @Column({ length: 24 })
  dp_version: string;

  @Column()
  dp_url: string;
}
