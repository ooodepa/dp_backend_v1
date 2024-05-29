import { MigrationInterface, QueryRunner } from 'typeorm';

export class DPDOCTTN1716650897462 implements MigrationInterface {
  name = 'DPDOCTTN1716650897462';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`DP_DOC_TTN\` (
                \`dp_id\` varchar(36) NOT NULL,
                \`dp_warehouseId\` int NOT NULL,
                \`dp_unp_gruzootpravitel\` varchar(255) NOT NULL,
                \`dp_unp_gruzopoluchatel\` varchar(255) NOT NULL,
                \`dp_unp_platelshchik\` varchar(255) NOT NULL,
                \`dp_seriya_ttn\` varchar(255) NOT NULL,
                \`dp_nomer_ttn\` varchar(255) NOT NULL,
                \`dp_data\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`dp_avtomobil\` varchar(255) NOT NULL,
                \`dp_pricep\` varchar(255) NOT NULL,
                \`dp_nomer_putevogo_lista\` varchar(255) NOT NULL,
                \`dp_vodilel_familiya\` varchar(255) NOT NULL,
                \`dp_voditel_imya\` varchar(255) NOT NULL,
                \`dp_voditel_otchestvo\` varchar(255) NOT NULL,
                \`dp_naimenovanie_platelshchika\` varchar(255) NOT NULL,
                \`dp_naimenovanie_gruzootpravitelya\` varchar(255) NOT NULL,
                \`dp_naimenovanie_gruzopoluchatelya\` varchar(255) NOT NULL,
                \`dp_adres_platelshchika\` varchar(255) NOT NULL,
                \`dp_adres_gruzootpravitelya\` varchar(255) NOT NULL,
                \`dp_adres_gruzopoluchatelya\` varchar(255) NOT NULL,
                \`dp_osnovanie_otpuska\` varchar(255) NOT NULL,
                \`dp_adres_punkt_pogruzki\` varchar(255) NOT NULL,
                \`dp_adres_punkt_razgruzki\` varchar(255) NOT NULL,
                \`dp_pereadresovka\` varchar(255) NOT NULL,
                \`dp_otpusk_razreshil_dolzhnost\` varchar(255) NOT NULL,
                \`dp_otpusk_razreshil_familiya\` varchar(255) NOT NULL,
                \`dp_otpusk_razreshil_imya\` varchar(255) NOT NULL,
                \`dp_otpusk_razreshil_otchestvo\` varchar(255) NOT NULL,
                \`dp_sdal_gruzootpravitel_dolzhnost\` varchar(255) NOT NULL,
                \`dp_sdal_gruzootpravitel_familiya\` varchar(255) NOT NULL,
                \`dp_sdal_gruzootpravitel_imya\` varchar(255) NOT NULL,
                \`dp_sdal_gruzootpravitel_otchestvo\` varchar(255) NOT NULL,
                \`dp_sdal_gruzootpravitel_nomer_plomby\` varchar(255) NOT NULL,
                \`dp_tovar_k_perevozke_prinyal_dolzhnost\` varchar(255) NOT NULL,
                \`dp_tovar_k_perevozke_prinyal_familiya\` varchar(255) NOT NULL,
                \`dp_tovar_k_perevozke_prinyal_imya\` varchar(255) NOT NULL,
                \`dp_tovar_k_perevozke_prinyal_otchestvo\` varchar(255) NOT NULL,
                \`dp_tovar_k_perevozke_prinyal_nomer_doverenosti\` varchar(255) NOT NULL,
                \`dp_tovar_k_perevozke_prinyal_data_doverenostiy\` varchar(255) NOT NULL,
                \`dp_tovar_k_perevozke_prinyal_naimenovanie_organizacii\` varchar(255) NOT NULL,
                \`dp_gruzopoluchatel_dolzhnost\` varchar(255) NOT NULL,
                \`dp_gruzopoluchatel_familiya\` varchar(255) NOT NULL,
                \`dp_gruzopoluchatel_imya\` varchar(255) NOT NULL,
                \`dp_gruzopoluchatel_otchestvo\` varchar(255) NOT NULL,
                \`dp_gruzopoluchatel_nomer_plomby\` varchar(255) NOT NULL,
                \`dp_transportnye_uslugi\` varchar(255) NOT NULL,
                \`dp_sostavlennye_akty\` varchar(255) NOT NULL,
                \`dp_taksirovka\` varchar(255) NOT NULL,
                \`dp_s_tovarom_peredany_dokumenty\` varchar(255) NOT NULL,
                \`dp_stroka_tablicy_pogruzka\` varchar(255) NOT NULL,
                \`dp_stroka_tablicy_razgruzka\` varchar(255) NOT NULL,
                \`dp_stroka_tablicy_po_zakazu\` varchar(255) NOT NULL,
                \`dp_stroka_tablicy_vypolneno\` varchar(255) NOT NULL,
                \`dp_stroka_tablicy_rascenka\` varchar(255) NOT NULL,
                \`dp_stroka_tablicy_k_oplate\` varchar(255) NOT NULL,
                \`dp_ozon_barcode\` varchar(255) NOT NULL,
                PRIMARY KEY (\`dp_id\`)
            ) ENGINE = InnoDB
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE \`DP_DOC_TTN\`
        `);
  }
}
