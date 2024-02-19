import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserEntity } from './user.entity';

@Entity('DP_DOC_ChangeEmail')
export class ChangeEmailEntity {
  @PrimaryGeneratedColumn()
  dp_id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP()' })
  dp_date: Date;

  @Column()
  dp_token: string;

  @Column()
  dp_oldEmail: string;

  @Column()
  dp_newEmail: string;

  @ManyToOne(() => UserEntity, (e: UserEntity) => e.dp_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'dp_userId' })
  @Column()
  dp_userId: number;

  @Column({ default: false })
  dp_isClosed: boolean;
}
