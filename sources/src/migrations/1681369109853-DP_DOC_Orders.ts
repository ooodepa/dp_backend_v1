import { MigrationInterface, QueryRunner } from 'typeorm';

export class DPDOCOrders1681369109853 implements MigrationInterface {
  name = 'DPDOCOrders1681369109853';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE \`DP_DOC_Orders\` (
            \`dp_id\` varchar(36) NOT NULL,
            \`dp_date\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            \`dp_userId\` int NOT NULL,
            \`dp_isCancelled\` tinyint NOT NULL DEFAULT 0,
            \`dp_isCompleted\` tinyint NOT NULL DEFAULT 0,
            PRIMARY KEY (\`dp_id\`)
        ) ENGINE = InnoDB
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_DOC_Orders\`
        ADD CONSTRAINT \`FK_e6f4202807824a799251356b67c\` FOREIGN KEY (\`dp_userId\`) REFERENCES \`DP_CTL_Users\`(\`dp_id\`) ON DELETE CASCADE ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
        CREATE TABLE \`DP_LST_OrderItems\` (
            \`dp_id\` int NOT NULL AUTO_INCREMENT,
            \`dp_orderId\` varchar(36) NOT NULL,
            \`dp_itemId\` varchar(36) NOT NULL,
            \`dp_count\` int NOT NULL,
            \`dp_cost\` float NOT NULL,
            PRIMARY KEY (\`dp_id\`)
        ) ENGINE = InnoDB
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_LST_OrderItems\`
        ADD CONSTRAINT \`FK_365d9f1baaafd6c8a5d3314ecdf\` FOREIGN KEY (\`dp_orderId\`) REFERENCES \`DP_DOC_Orders\`(\`dp_id\`) ON DELETE CASCADE ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_LST_OrderItems\`
        ADD CONSTRAINT \`FK_17ef6a25e7eaf3496508d98e0c5\` FOREIGN KEY (\`dp_itemId\`) REFERENCES \`DP_CTL_Items\`(\`dp_id\`) ON DELETE CASCADE ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE \`DP_LST_OrderItems\` DROP FOREIGN KEY \`FK_17ef6a25e7eaf3496508d98e0c5\`
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_LST_OrderItems\` DROP FOREIGN KEY \`FK_365d9f1baaafd6c8a5d3314ecdf\`
    `);
    await queryRunner.query(`
        DROP TABLE \`DP_LST_OrderItems\`
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_DOC_Orders\` DROP FOREIGN KEY \`FK_e6f4202807824a799251356b67c\`
    `);
    await queryRunner.query(`
        DROP TABLE \`DP_DOC_Orders\`
    `);
  }
}
