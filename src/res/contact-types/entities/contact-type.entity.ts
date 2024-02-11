import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

// @Entity('dp_ctl_contacttypes')
export class ContactTypeEntity {
  @PrimaryGeneratedColumn()
  dp_id: number;

  @Index('UNI_ctlContactTypes_name', { unique: true })
  @Column()
  dp_name: string;

  @Column({ default: false })
  dp_isHidden: boolean;
}
