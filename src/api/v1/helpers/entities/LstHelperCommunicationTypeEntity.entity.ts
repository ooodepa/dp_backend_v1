import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { HelperEntity } from './helper.entity';
import { ContactTypeEntity } from 'src/api/v1/contact-types/entities/contact-type.entity';

@Entity('DP_LST_HelperContactTypes')
export class LstHelperCommunicationTypeEntity {
  @PrimaryGeneratedColumn()
  dp_id: number;

  @ManyToOne(() => HelperEntity, (e: HelperEntity) => e.dp_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'dp_helperId' })
  @Column({ length: 36 })
  dp_helperId: string;

  @ManyToOne(() => ContactTypeEntity, (e: ContactTypeEntity) => e.dp_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'dp_contactTypeId' })
  @Column()
  dp_contactTypeId: number;

  @Column()
  dp_value: string;

  @Column({ default: false })
  dp_isHidden: boolean;
}
