import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { ItemEntity } from './item.entity';
import { UserEntity } from 'src/res/users/entities/user.entity';

@Entity('DP_LST_FavoriteItems')
export class LstItemCharacteristicEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  dp_id: number;

  @ApiProperty()
  @ManyToOne(() => ItemEntity, (e: ItemEntity) => e.dp_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'dp_itemId' })
  @Column({ length: 36 })
  dp_itemId: string;

  @ApiProperty()
  @ManyToOne(() => UserEntity, (e: UserEntity) => e.dp_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'dp_userId' })
  @Column()
  dp_userId: number;
}
