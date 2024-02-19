import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ItemEntity } from './item.entity';
import { ItemCharacteristicEntity } from 'src/api/v1/item-characteristics/entities/item-characteristic.entity';

@Entity('DP_LST_ItemCharacteristics')
export class LstItemCharacteristicEntity {
  @PrimaryGeneratedColumn()
  dp_id: number;

  @ManyToOne(() => ItemEntity, (e: ItemEntity) => e.dp_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'dp_itemId' })
  @Column({ length: 36 })
  dp_itemId: string;

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

  @Column()
  dp_value: string;
}
