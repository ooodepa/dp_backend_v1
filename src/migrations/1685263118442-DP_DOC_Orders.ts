import { MigrationInterface, QueryRunner } from 'typeorm';

export class DPDOCOrders1685263118442 implements MigrationInterface {
  name = 'DPDOCOrders1685263118442';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE \`DP_DOC_Orders\`
        ADD \`dp_number\` int NULL
    `);
    await queryRunner.query(`
        SET @counter = 0
    `);
    await queryRunner.query(`
        UPDATE \`DP_DOC_Orders\` SET \`dp_number\` = (@counter := @counter + 1)
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_DOC_Orders\`
        ADD UNIQUE INDEX \`IDX_e3caedcbb7c8792e910135504f\` (\`dp_number\`)
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_DOC_Orders\`
        MODIFY \`dp_number\` int NOT NULL AUTO_INCREMENT
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE \`DP_DOC_Orders\` DROP COLUMN \`dp_number\`
    `);
  }
}
