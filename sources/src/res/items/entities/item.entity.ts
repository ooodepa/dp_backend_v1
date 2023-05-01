import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { LstItemGaleryEntity } from './item-galery.entity';
import { LstItemCharacteristicEntity } from './item-characteristics.entity';
import { ItemCategoryEntity } from 'src/res/item-categories/entities/item-category.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('DP_CTL_Items')
export class ItemEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  dp_id: string;

  @ApiProperty()
  @Column()
  dp_name: string;

  @ApiProperty()
  @Column({ unique: true, length: 32 })
  dp_model: string;

  @ApiProperty()
  @Column({ type: 'float' })
  dp_cost: number;

  @ApiProperty()
  @Column({ default: '' })
  dp_photoUrl: string;

  @ApiProperty()
  @ManyToOne(() => ItemCategoryEntity, (e: ItemCategoryEntity) => e.dp_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'dp_itemCategoryId' })
  @Column()
  dp_itemCategoryId: number;

  @ApiProperty()
  @Column({ default: '' })
  dp_seoKeywords: string;

  @ApiProperty()
  @Column({ default: '' })
  dp_seoDescription: string;

  @ApiProperty({ type: LstItemCharacteristicEntity })
  @OneToMany(
    () => LstItemCharacteristicEntity,
    (e: LstItemCharacteristicEntity) => e.dp_itemId,
  )
  @JoinColumn({ name: 'dp_id' })
  dp_itemCharecteristics: LstItemCharacteristicEntity[];

  @ApiProperty({ type: LstItemGaleryEntity })
  @OneToMany(() => LstItemGaleryEntity, (e: LstItemGaleryEntity) => e.dp_itemId)
  @JoinColumn({ name: 'dp_id' })
  dp_itemGalery: LstItemGaleryEntity[];
}
