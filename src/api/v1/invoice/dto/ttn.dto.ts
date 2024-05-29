import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class LstTtnItems {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  dp_vendorId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  dp_name: string;

  @IsString()
  @ApiProperty()
  dp_unit: string;

  @IsNumber()
  @ApiProperty()
  dp_count: number;

  @IsNumber()
  @ApiProperty()
  dp_priceWithoutVat: number;

  @IsNumber()
  @ApiProperty()
  dp_vatRate: number;

  @IsNumber()
  @ApiProperty()
  dp_cargoSpaces: number;

  @IsNumber()
  @ApiProperty()
  dp_cargoWeight: number;

  @IsString()
  @ApiProperty()
  dp_note: string;
}

export class BodyCreateTtnDto {
  @IsNumber()
  @ApiProperty()
  dp_warehouseId: number;

  @IsArray()
  @ArrayMinSize(1)
  @Type(() => LstTtnItems)
  @ApiProperty({ type: [LstTtnItems] })
  dp_lstTtnItems: LstTtnItems[];

  @IsString()
  @ApiProperty()
  dp_unp_gruzootpravitel: string;

  @IsString()
  @ApiProperty()
  dp_unp_gruzopoluchatel: string;

  @IsString()
  @ApiProperty()
  dp_unp_platelshchik: string;

  @IsString()
  @ApiProperty()
  dp_seriya_ttn: string;

  @IsString()
  @ApiProperty()
  dp_nomer_ttn: string;

  @IsString()
  @ApiProperty({ example: '2024-05-25' })
  dp_data: string;

  @IsString()
  @ApiProperty()
  dp_avtomobil: string;

  @IsString()
  @ApiProperty()
  dp_pricep: string;

  @IsString()
  @ApiProperty()
  dp_nomer_putevogo_lista: string;

  @IsString()
  @ApiProperty()
  dp_vodilel_familiya: string;

  @IsString()
  @ApiProperty()
  dp_voditel_imya: string;

  @IsString()
  @ApiProperty()
  dp_voditel_otchestvo: string;

  @IsString()
  @ApiProperty()
  dp_naimenovanie_platelshchika: string;

  @IsString()
  @ApiProperty()
  dp_naimenovanie_gruzootpravitelya: string;

  @IsString()
  @ApiProperty()
  dp_naimenovanie_gruzopoluchatelya: string;

  @IsString()
  @ApiProperty()
  dp_adres_platelshchika: string;

  @IsString()
  @ApiProperty()
  dp_adres_gruzootpravitelya: string;

  @IsString()
  @ApiProperty()
  dp_adres_gruzopoluchatelya: string;

  @IsString()
  @ApiProperty()
  dp_osnovanie_otpuska: string;

  @IsString()
  @ApiProperty()
  dp_adres_punkt_pogruzki: string;

  @IsString()
  @ApiProperty()
  dp_adres_punkt_razgruzki: string;

  @IsString()
  @ApiProperty()
  dp_pereadresovka: string;

  @IsString()
  @ApiProperty()
  dp_otpusk_razreshil_dolzhnost: string;

  @IsString()
  @ApiProperty()
  dp_otpusk_razreshil_familiya: string;

  @IsString()
  @ApiProperty()
  dp_otpusk_razreshil_imya: string;

  @IsString()
  @ApiProperty()
  dp_otpusk_razreshil_otchestvo: string;

  @IsString()
  @ApiProperty()
  dp_sdal_gruzootpravitel_dolzhnost: string;

  @IsString()
  @ApiProperty()
  dp_sdal_gruzootpravitel_familiya: string;

  @IsString()
  @ApiProperty()
  dp_sdal_gruzootpravitel_imya: string;

  @IsString()
  @ApiProperty()
  dp_sdal_gruzootpravitel_otchestvo: string;

  @IsString()
  @ApiProperty()
  dp_sdal_gruzootpravitel_nomer_plomby: string;

  @IsString()
  @ApiProperty()
  dp_tovar_k_perevozke_prinyal_dolzhnost: string;

  @IsString()
  @ApiProperty()
  dp_tovar_k_perevozke_prinyal_familiya: string;

  @IsString()
  @ApiProperty()
  dp_tovar_k_perevozke_prinyal_imya: string;

  @IsString()
  @ApiProperty()
  dp_tovar_k_perevozke_prinyal_otchestvo: string;

  @IsString()
  @ApiProperty()
  dp_tovar_k_perevozke_prinyal_nomer_doverenosti: string;

  @IsString()
  @ApiProperty()
  dp_tovar_k_perevozke_prinyal_data_doverenostiy: string;

  @IsString()
  @ApiProperty()
  dp_tovar_k_perevozke_prinyal_naimenovanie_organizacii: string;

  @IsString()
  @ApiProperty()
  dp_gruzopoluchatel_dolzhnost: string;

  @IsString()
  @ApiProperty()
  dp_gruzopoluchatel_familiya: string;

  @IsString()
  @ApiProperty()
  dp_gruzopoluchatel_imya: string;

  @IsString()
  @ApiProperty()
  dp_gruzopoluchatel_otchestvo: string;

  @IsString()
  @ApiProperty()
  dp_gruzopoluchatel_nomer_plomby: string;

  @IsString()
  @ApiProperty()
  dp_transportnye_uslugi: string;

  @IsString()
  @ApiProperty()
  dp_sostavlennye_akty: string;

  @IsString()
  @ApiProperty()
  dp_taksirovka: string;

  @IsString()
  @ApiProperty()
  dp_s_tovarom_peredany_dokumenty: string;

  @IsString()
  @ApiProperty()
  dp_stroka_tablicy_pogruzka: string;

  @IsString()
  @ApiProperty()
  dp_stroka_tablicy_razgruzka: string;

  @IsString()
  @ApiProperty()
  dp_stroka_tablicy_po_zakazu: string;

  @IsString()
  @ApiProperty()
  dp_stroka_tablicy_vypolneno: string;

  @IsString()
  @ApiProperty()
  dp_stroka_tablicy_rascenka: string;

  @IsString()
  @ApiProperty()
  dp_stroka_tablicy_k_oplate: string;

  @IsString()
  @ApiProperty()
  dp_ozon_barcode: string;
}
