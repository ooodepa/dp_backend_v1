import { MigrationInterface, QueryRunner } from 'typeorm';

export class DPDOCOrderStatuses1685158190658 implements MigrationInterface {
  name = 'DPDOCOrderStatuses1685158190658';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE \`DP_DOC_OrderStatuses\` (
            \`dp_id\` int NOT NULL AUTO_INCREMENT,
            \`dp_date\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            \`dp_status\` varchar(255) NOT NULL,
            \`dp_orderId\` varchar(36) NOT NULL,
            PRIMARY KEY (\`dp_id\`)
        ) ENGINE = InnoDB
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_DOC_OrderStatuses\`
        ADD CONSTRAINT \`FK_2ad9d13bc5ce1b4b9c1a65297cf\` FOREIGN KEY (\`dp_orderId\`) REFERENCES \`DP_DOC_Orders\`(\`dp_id\`) ON DELETE CASCADE ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE \`DP_DOC_OrderStatuses\` DROP FOREIGN KEY \`FK_2ad9d13bc5ce1b4b9c1a65297cf\`
    `);
    await queryRunner.query(`
        DROP TABLE \`DP_DOC_OrderStatuses\`
    `);
  }
}
