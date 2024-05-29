import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('DP_CTL_Сounterparties')
export class CounterpartiesEntity {
  @PrimaryColumn()
  dp_id: string;

  @Column()
  dp_unp: string;

  @Column()
  dp_fullnameName: string;

  @Column()
  dp_shortName: string;

  @Column()
  dp_address: string;

  @Column()
  dp_mnsCode: number;

  @Column()
  dp_mnsName: string;

  @Column({ type: 'timestamp', default: 'CURRENT_TIMESTAMP' })
  dp_regDate: Date;

  @Column()
  dp_ttn_adres_gruzootpravitelya: string;

  @Column()
  dp_ttn_adres_punkt_razgruzki: string;
}
