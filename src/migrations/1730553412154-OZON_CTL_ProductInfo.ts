import { MigrationInterface, QueryRunner } from 'typeorm';

export class OZONCTLProductInfo1730553412154 implements MigrationInterface {
  name = 'OZONCTLProductInfo1730553412154';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`OZON_CTL_ProductInfo\` (
                \`id\` int NOT NULL,
                \`name\` text NULL,
                \`offer_id\` text NULL,
                \`barcode\` text NULL,
                \`buybox_price\` text NULL,
                \`category_id\` int NULL,
                \`created_at\` text NULL,
                \`images\` text NULL,
                \`marketing_price\` text NULL,
                \`min_ozon_price\` text NULL,
                \`old_price\` text NULL,
                \`premium_price\` text NULL,
                \`price\` text NULL,
                \`recommended_price\` text NULL,
                \`min_price\` text NULL,
                \`sources\` text NULL,
                \`stocks__coming\` int NULL,
                \`stocks__present\` int NULL,
                \`stocks__reserved\` int NULL,
                \`errors\` text NULL,
                \`vat\` text NULL,
                \`visible\` tinyint NULL,
                \`visibility_details__has_price\` tinyint NULL,
                \`visibility_details__has_stock\` tinyint NULL,
                \`visibility_details__active_product\` tinyint NULL,
                \`price_index\` text NULL,
                \`commissions\` text NULL,
                \`volume_weight\` text NULL,
                \`is_prepayment\` tinyint NULL,
                \`is_prepayment_allowed\` tinyint NULL,
                \`images360\` text NULL,
                \`color_image\` text NULL,
                \`primary_image\` text NULL,
                \`status\` text NULL,
                \`state\` text NULL,
                \`service_type\` text NULL,
                \`fbo_sku\` int NULL,
                \`fbs_sku\` int NULL,
                \`currency_code\` text NULL,
                \`is_kgt\` tinyint NULL,
                \`discounted_stocks__coming\` int NULL,
                \`discounted_stocks__present\` int NULL,
                \`discounted_stocks__reserved\` int NULL,
                \`is_discounted\` tinyint NULL,
                \`has_discounted_item\` tinyint NULL,
                \`barcodes\` text NULL,
                \`updated_at\` text NULL,
                \`price_indexes\` text NULL,
                \`sku\` int NULL,
                \`description_category_id\` int NULL,
                \`type_id\` int NULL,
                \`is_archived\` tinyint NULL,
                \`is_autoarchived\` tinyint NULL,
                \`_raw_json\` text NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE \`OZON_CTL_ProductInfo\`
        `);
  }
}
