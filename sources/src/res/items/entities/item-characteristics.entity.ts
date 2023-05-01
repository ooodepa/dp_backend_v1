import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { ItemEntity } from './item.entity';
import { ItemCharacteristicEntity } from 'src/res/item-characteristics/entities/item-characteristic.entity';

@Entity('DP_LST_ItemCharacteristics')
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
  @ManyToOne(
    () => ItemCharacteristicEntity,
    (e: ItemCharacteristicEntity) => e.dp_id,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'dp_characteristicId' })
  @Column()
  dp_characteristicId: number;

  @ApiProperty()
  @Column()
  dp_value: string;
}
