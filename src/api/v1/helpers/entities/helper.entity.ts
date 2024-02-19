import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { LstHelperCommunicationTypeEntity } from './LstHelperCommunicationTypeEntity.entity';

@Entity('DP_CTL_Helpers')
export class HelperEntity {
  @PrimaryGeneratedColumn('uuid')
  dp_id: string;

  @Index('UNI_ctlHelpers_name', { unique: true })
  @Column()
  dp_name: string;

  @Column({ default: '', length: 2048 })
  dp_text: string;

  @OneToMany(
    () => LstHelperCommunicationTypeEntity,
    (e: LstHelperCommunicationTypeEntity) => e.dp_helperId,
  )
  @JoinColumn({ name: 'dp_id' })
  dp_helperContactTypes: LstHelperCommunicationTypeEntity[];

  @Column({ default: 10000 })
  dp_sortingIndex: number;

  @Column({ default: false })
  dp_isHidden: boolean;
}
