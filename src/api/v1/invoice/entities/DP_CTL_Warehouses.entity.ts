import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('DP_CTL_Warehouses')
export class WarehousesEntity {
  @PrimaryColumn()
  dp_id: string;

  @Column({ nullable: true })
  dp_name: string;
}
