import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('DP_LST_InventoryItems')
export class InventoryItemsEntity {
  @PrimaryGeneratedColumn()
  dp_id: number;

  @Column()
  dp_warehouseId: number;

  @Column()
  dp_vendorId: string;

  @Column()
  dp_count: number;

  @Column()
  dp_note: string;
}
