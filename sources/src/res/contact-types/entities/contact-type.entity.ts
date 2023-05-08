import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('DP_CTL_ContactTypes')
export class ContactTypeEntity {
  @PrimaryGeneratedColumn()
  dp_id: number;

  @Index('UNI_ctlContactTypes_name', { unique: true })
  @Column()
  dp_name: string;

  @Column({ default: false })
  dp_isHidden: boolean;
}
