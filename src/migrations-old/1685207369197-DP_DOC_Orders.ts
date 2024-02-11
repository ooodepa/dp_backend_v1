import { MigrationInterface, QueryRunner } from 'typeorm';

export class DPDOCOrders1685207369197 implements MigrationInterface {
  name = 'DPDOCOrders1685207369197';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE \`DP_DOC_Orders\`
        ADD \`dp_canceledByClientOn\` timestamp NULL
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_DOC_Orders\`
        ADD \`dp_canceledByManagerOn\` timestamp NULL
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_DOC_Orders\`
        ADD \`dp_sentedByManagerOn\` timestamp NULL
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_DOC_Orders\`
        ADD \`dp_receivedByClientOn\` timestamp NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE \`DP_DOC_Orders\` DROP COLUMN \`dp_receivedByClientOn\`
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_DOC_Orders\` DROP COLUMN \`dp_sentedByManagerOn\`
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_DOC_Orders\` DROP COLUMN \`dp_canceledByManagerOn\`
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_DOC_Orders\` DROP COLUMN \`dp_canceledByClientOn\`
    `);
  }
}
