import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('DP_CTL_Roles')
export class RoleEntity {
  @PrimaryGeneratedColumn()
  dp_id: number;

  @Column({ unique: true, length: 8 })
  dp_name: string;
}
