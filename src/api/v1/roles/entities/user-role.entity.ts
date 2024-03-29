import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { RoleEntity } from './role.entity';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('DP_DOC_UserRoles')
export class UserRolesEntity {
  @PrimaryGeneratedColumn()
  dp_id: number;

  @Column({ type: 'timestamp', default: 'CURRENT_TIMESTAMP' })
  dp_date: Date;

  @ManyToOne(() => UserEntity, (e: UserEntity) => e.dp_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'dp_userId' })
  @Column()
  dp_userId: number;

  @ManyToOne(() => RoleEntity, (e: RoleEntity) => e.dp_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'dp_roleId' })
  @Column()
  dp_roleId: number;
}
