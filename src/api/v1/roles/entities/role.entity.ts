import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('DP_CTL_Roles')
export class RoleEntity {
  @PrimaryGeneratedColumn()
  dp_id: number;

  @Index('UNI_ctlRoles_name', { unique: true })
  @Column({ length: 8 })
  dp_name: string;
}
