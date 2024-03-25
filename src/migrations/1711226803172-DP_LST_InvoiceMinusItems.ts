import { MigrationInterface, QueryRunner } from 'typeorm';

export class DPLSTInvoiceMinusItems1711226803172 implements MigrationInterface {
  name = 'DPLSTInvoiceMinusItems1711226803172';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`DP_LST_InvoiceMinusItems\` (
                \`dp_id\` int NOT NULL AUTO_INCREMENT,
                \`dp_invoiceMinusId\` varchar(36) NOT NULL,
                \`dp_vendorId\` varchar(255) NOT NULL,
                \`dp_count\` int NOT NULL,
                \`dp_comment\` varchar(255) NULL,
                PRIMARY KEY (\`dp_id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            ALTER TABLE \`DP_LST_InvoiceMinusItems\`
            ADD CONSTRAINT \`FK_9616406ef5f5806ce7e00b73aab\` FOREIGN KEY (\`dp_invoiceMinusId\`) REFERENCES \`DP_DOC_InvoiceMinus\`(\`dp_id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`DP_LST_InvoiceMinusItems\` DROP FOREIGN KEY \`FK_9616406ef5f5806ce7e00b73aab\`
        `);
    await queryRunner.query(`
            DROP TABLE \`DP_LST_InvoiceMinusItems\`
        `);
  }
}
