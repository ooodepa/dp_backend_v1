import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('DP_CTL_Users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  dp_id: number;

  @Index('UNI_ctlUsers_login', { unique: true })
  @Column({ length: 64 })
  dp_login: string;

  @Index('UNI_ctlUsers_email', { unique: true })
  @Column({ length: 64 })
  dp_email: string;

  @Column({ length: 60 })
  dp_passwordHash: string;

  @Column({ length: 13 })
  dp_unp: string;

  @Column()
  dp_nameLegalEntity: string;

  @Column()
  dp_shortNameLegalEntity: string;

  @Column()
  dp_address: string;

  @Column({ length: 13 })
  dp_receptionPhone: string;

  @Column({ length: 32 })
  dp_firstName: string;

  @Column({ length: 32 })
  dp_lastName: string;

  @Column({ length: 32 })
  dp_middleName: string;
}
