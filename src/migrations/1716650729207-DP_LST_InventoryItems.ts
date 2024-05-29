import { MigrationInterface, QueryRunner } from 'typeorm';

export class DPLSTInventoryItems1716650729207 implements MigrationInterface {
  name = 'DPLSTInventoryItems1716650729207';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`DP_LST_InventoryItems\` (
                \`dp_id\` int NOT NULL AUTO_INCREMENT,
                \`dp_warehouseId\` int NOT NULL,
                \`dp_vendorId\` varchar(255) NOT NULL,
                \`dp_count\` int NOT NULL,
                \`dp_note\` varchar(255) NOT NULL,
                PRIMARY KEY (\`dp_id\`)
            ) ENGINE = InnoDB
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE \`DP_LST_InventoryItems\`
        `);
  }
}
