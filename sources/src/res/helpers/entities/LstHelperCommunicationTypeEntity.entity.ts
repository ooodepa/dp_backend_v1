import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { HelperEntity } from './helper.entity';
import { ContactTypeEntity } from 'src/res/contact-types/entities/contact-type.entity';

@Entity('DP_LST_HelperContactTypes')
export class LstHelperCommunicationTypeEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  dp_id: number;

  @ApiProperty()
  @ManyToOne(() => HelperEntity, (e: HelperEntity) => e.dp_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'dp_helperId' })
  @Column({ length: 36 })
  dp_helperId: string;

  @ApiProperty()
  @ManyToOne(() => ContactTypeEntity, (e: ContactTypeEntity) => e.dp_id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'dp_contactTypeId' })
  @Column()
  dp_contactTypeId: number;

  @ApiProperty({ example: '+375331112233' })
  @Column()
  dp_value: string;

  @ApiProperty({ example: false })
  @Column({ default: false })
  dp_isHidden: boolean;
}
