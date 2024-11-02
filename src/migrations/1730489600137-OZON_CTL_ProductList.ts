import { MigrationInterface, QueryRunner } from 'typeorm';

export class OZONCTLProductList1730489600137 implements MigrationInterface {
  name = 'OZONCTLProductList1730489600137';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`OZON_CTL_ProductList\` (
                \`product_id\` int NOT NULL,
                \`offer_id\` text NOT NULL,
                \`is_fbo_visible\` tinyint NOT NULL,
                \`is_fbs_visible\` tinyint NOT NULL,
                \`archived\` tinyint NOT NULL,
                \`is_discounted\` tinyint NOT NULL,
                \`_raw_json\` text NOT NULL,
                PRIMARY KEY (\`product_id\`)
            ) ENGINE = InnoDB
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE \`OZON_CTL_ProductList\`
        `);
  }
}
