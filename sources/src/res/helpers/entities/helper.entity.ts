import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { LstHelperCommunicationTypeEntity } from './LstHelperCommunicationTypeEntity.entity';

@Entity('DP_CTL_Helpers')
export class HelperEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  dp_id: string;

  @ApiProperty({ example: 10000 })
  @Column({ default: 10000 })
  dp_sortingIndex: number;

  @ApiProperty({ example: 'Центральный офис' })
  @Column({ unique: true })
  dp_name: string;

  @ApiProperty({ example: 'г. Брест' })
  @Column({ default: '' })
  dp_description: string;

  @ApiProperty({ example: false })
  @Column({ default: false })
  dp_isHidden: boolean;

  @ApiProperty({ type: [LstHelperCommunicationTypeEntity] })
  @OneToMany(
    () => LstHelperCommunicationTypeEntity,
    (e: LstHelperCommunicationTypeEntity) => e.dp_helperId,
  )
  @JoinColumn({ name: 'dp_id' })
  dp_helperContactTypes: LstHelperCommunicationTypeEntity[];
}
