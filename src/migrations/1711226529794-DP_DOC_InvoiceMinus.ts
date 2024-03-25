import { MigrationInterface, QueryRunner } from 'typeorm';

export class DPDOCInvoiceMinus1711226529794 implements MigrationInterface {
  name = 'DPDOCInvoiceMinus1711226529794';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`DP_DOC_InvoiceMinus\` (
                \`dp_id\` varchar(36) NOT NULL,
                \`dp_date\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP(),
                \`dp_number\` varchar(255) NULL,
                \`dp_comment\` varchar(255) NULL,
                PRIMARY KEY (\`dp_id\`)
            ) ENGINE = InnoDB
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE \`DP_DOC_InvoiceMinus\`
        `);
  }
}
