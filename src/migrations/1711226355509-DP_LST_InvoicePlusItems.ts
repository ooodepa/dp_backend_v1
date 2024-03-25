import { MigrationInterface, QueryRunner } from 'typeorm';

export class DPLSTInvoicePlusItems1711226355509 implements MigrationInterface {
  name = 'DPLSTInvoicePlusItems1711226355509';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`DP_LST_InvoicePlusItems\` (
                \`dp_id\` int NOT NULL AUTO_INCREMENT,
                \`dp_invoicePlusId\` varchar(36) NOT NULL,
                \`dp_vendorId\` varchar(255) NOT NULL,
                \`dp_count\` int NOT NULL,
                \`dp_comment\` varchar(255) NULL,
                PRIMARY KEY (\`dp_id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            ALTER TABLE \`DP_LST_InvoicePlusItems\`
            ADD CONSTRAINT \`FK_e2e3889a0e2253dc37d8bd63761\` FOREIGN KEY (\`dp_invoicePlusId\`) REFERENCES \`DP_DOC_InvoicePlus\`(\`dp_id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`DP_LST_InvoicePlusItems\` DROP FOREIGN KEY \`FK_e2e3889a0e2253dc37d8bd63761\`
        `);
    await queryRunner.query(`
            DROP TABLE \`DP_LST_InvoicePlusItems\`
        `);
  }
}
