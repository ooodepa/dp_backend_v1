import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { UserEntity } from 'src/res/users/entities/user.entity';

@Entity('DP_DOC_Sessions')
export class SessionEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  dp_id: number;

  @ApiProperty({ example: '2023-04-02T00:00:00.000Z' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP()' })
  dp_date: Date;

  @ApiProperty({ example: '111.111.111.111' })
  @Column()
  dp_ip: string;

  @ApiProperty({ example: 'Firefox Browser' })
  @Column()
  dp_agent: string;

  @Column({ length: 64 })
  dp_accessHash: string;

  @Column({ length: 64 })
  dp_refreshHash: string;

  @ManyToOne(() => UserEntity, (e: UserEntity) => e.dp_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'dp_userId' })
  @Column()
  dp_userId: number;
}
