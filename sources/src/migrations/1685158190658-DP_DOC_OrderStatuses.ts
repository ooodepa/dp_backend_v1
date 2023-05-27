import { MigrationInterface, QueryRunner } from 'typeorm';

export class DPDOCOrderStatuses1685158190658 implements MigrationInterface {
  name = 'DPDOCOrderStatuses1685158190658';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE \`DP_DOC_OrderStatuses\` (
            \`dp_id\` varchar(36) NOT NULL,
            \`dp_date\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            \`dp_status\` varchar(255) NOT NULL,
            \`dp_orderId\` varchar(36) NOT NULL,
            PRIMARY KEY (\`dp_id\`)
        ) ENGINE = InnoDB
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_DOC_Orders\` DROP COLUMN \`dp_isCancelled\`
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_DOC_Orders\` DROP COLUMN \`dp_isCompleted\`
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_DOC_Orders\`
        ADD \`dp_cancaledOn\` timestamp NULL
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_DOC_Orders\`
        ADD \`dp_fulfilledOn\` timestamp NULL
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_DOC_Orders\`
        ADD \`dp_receivedOn\` timestamp NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE \`DP_DOC_Orders\` DROP COLUMN \`dp_receivedOn\`
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_DOC_Orders\` DROP COLUMN \`dp_fulfilledOn\`
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_DOC_Orders\` DROP COLUMN \`dp_cancaledOn\`
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_DOC_Orders\`
        ADD \`dp_isCompleted\` tinyint NOT NULL DEFAULT '0'
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_DOC_Orders\`
        ADD \`dp_isCancelled\` tinyint NOT NULL DEFAULT '0'
    `);
    await queryRunner.query(`
        DROP TABLE \`DP_DOC_OrderStatuses\`
    `);
  }
}
