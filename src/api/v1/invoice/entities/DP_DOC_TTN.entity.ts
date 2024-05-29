import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LstTtnItemsEntity } from './DP_LST_TtnItems.entity';

@Entity('DP_DOC_TTN')
export class TtnEntity {
  @PrimaryGeneratedColumn('uuid')
  dp_id: string;

  @Column()
  dp_warehouseId: number;

  @OneToMany(() => LstTtnItemsEntity, (e: LstTtnItemsEntity) => e.dp_ttnId)
  @JoinColumn({ name: 'dp_id' })
  dp_lstTtnItems: LstTtnItemsEntity[];

  @Column()
  dp_unp_gruzootpravitel: string;

  @Column()
  dp_unp_gruzopoluchatel: string;

  @Column()
  dp_unp_platelshchik: string;

  @Column()
  dp_seriya_ttn: string;

  @Column()
  dp_nomer_ttn: string;

  @Column({ type: 'timestamp', default: 'CURRENT_TIMESTAMP' })
  dp_data: Date;

  @Column()
  dp_avtomobil: string;

  @Column()
  dp_pricep: string;

  @Column()
  dp_nomer_putevogo_lista: string;

  @Column()
  dp_vodilel_familiya: string;

  @Column()
  dp_voditel_imya: string;

  @Column()
  dp_voditel_otchestvo: string;

  @Column()
  dp_naimenovanie_platelshchika: string;

  @Column()
  dp_naimenovanie_gruzootpravitelya: string;

  @Column()
  dp_naimenovanie_gruzopoluchatelya: string;

  @Column()
  dp_adres_platelshchika: string;

  @Column()
  dp_adres_gruzootpravitelya: string;

  @Column()
  dp_adres_gruzopoluchatelya: string;

  @Column()
  dp_osnovanie_otpuska: string;

  @Column()
  dp_adres_punkt_pogruzki: string;

  @Column()
  dp_adres_punkt_razgruzki: string;

  @Column()
  dp_pereadresovka: string;

  @Column()
  dp_otpusk_razreshil_dolzhnost: string;

  @Column()
  dp_otpusk_razreshil_familiya: string;

  @Column()
  dp_otpusk_razreshil_imya: string;

  @Column()
  dp_otpusk_razreshil_otchestvo: string;

  @Column()
  dp_sdal_gruzootpravitel_dolzhnost: string;

  @Column()
  dp_sdal_gruzootpravitel_familiya: string;

  @Column()
  dp_sdal_gruzootpravitel_imya: string;

  @Column()
  dp_sdal_gruzootpravitel_otchestvo: string;

  @Column()
  dp_sdal_gruzootpravitel_nomer_plomby: string;

  @Column()
  dp_tovar_k_perevozke_prinyal_dolzhnost: string;

  @Column()
  dp_tovar_k_perevozke_prinyal_familiya: string;

  @Column()
  dp_tovar_k_perevozke_prinyal_imya: string;

  @Column()
  dp_tovar_k_perevozke_prinyal_otchestvo: string;

  @Column()
  dp_tovar_k_perevozke_prinyal_nomer_doverenosti: string;

  @Column()
  dp_tovar_k_perevozke_prinyal_data_doverenostiy: string;

  @Column()
  dp_tovar_k_perevozke_prinyal_naimenovanie_organizacii: string;

  @Column()
  dp_gruzopoluchatel_dolzhnost: string;

  @Column()
  dp_gruzopoluchatel_familiya: string;

  @Column()
  dp_gruzopoluchatel_imya: string;

  @Column()
  dp_gruzopoluchatel_otchestvo: string;

  @Column()
  dp_gruzopoluchatel_nomer_plomby: string;

  @Column()
  dp_transportnye_uslugi: string;

  @Column()
  dp_sostavlennye_akty: string;

  @Column()
  dp_taksirovka: string;

  @Column()
  dp_s_tovarom_peredany_dokumenty: string;

  @Column()
  dp_stroka_tablicy_pogruzka: string;

  @Column()
  dp_stroka_tablicy_razgruzka: string;

  @Column()
  dp_stroka_tablicy_po_zakazu: string;

  @Column()
  dp_stroka_tablicy_vypolneno: string;

  @Column()
  dp_stroka_tablicy_rascenka: string;

  @Column()
  dp_stroka_tablicy_k_oplate: string;

  @Column()
  dp_ozon_barcode: string;
}
