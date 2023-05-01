import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('DP_CTL_ContactTypes')
export class ContactTypeEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  dp_id: number;

  @ApiProperty({ example: 'whatsapp' })
  @Column({ unique: true })
  dp_name: string;
}
