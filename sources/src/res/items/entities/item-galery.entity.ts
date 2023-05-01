import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { ItemEntity } from './item.entity';

@Entity('DP_LST_ItemGalery')
export class LstItemGaleryEntity {
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

  @ApiProperty({ example: 'https://example.com/image.png' })
  @Column()
  dp_photoUrl: string;
}
