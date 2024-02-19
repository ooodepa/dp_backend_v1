import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserEntity } from 'src/api/v1/users/entities/user.entity';
import { ItemEntity } from 'src/api/v1/items/entities/item.entity';

@Entity('DP_LST_FavoriteItems')
export class FavoriteItemEntity {
  @PrimaryGeneratedColumn()
  dp_id: number;

  @ManyToOne(() => UserEntity, (e: UserEntity) => e.dp_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'dp_userId' })
  @Column()
  dp_userId: number;

  @ManyToOne(() => ItemEntity, (e: ItemEntity) => e.dp_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'dp_itemId' })
  @Column({ length: 36 })
  dp_itemId: string;
}
