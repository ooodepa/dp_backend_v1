import { MigrationInterface, QueryRunner } from 'typeorm';

export class DPLSTTtnItems1716651014731 implements MigrationInterface {
  name = 'DPLSTTtnItems1716651014731';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`DP_LST_TtnItems\` (
                \`dp_id\` int NOT NULL AUTO_INCREMENT,
                \`dp_ttnId\` varchar(36) NOT NULL,
                \`dp_vendorId\` varchar(255) NOT NULL,
                \`dp_name\` varchar(255) NOT NULL,
                \`dp_unit\` varchar(255) NOT NULL,
                \`dp_count\` int NOT NULL,
                \`dp_priceWithoutVat\` decimal(16, 2) NOT NULL,
                \`dp_vatRate\` int NOT NULL,
                \`dp_cargoSpaces\` int NOT NULL,
                \`dp_cargoWeight\` int NOT NULL,
                \`dp_note\` varchar(255) NOT NULL,
                PRIMARY KEY (\`dp_id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            ALTER TABLE \`DP_LST_TtnItems\`
            ADD CONSTRAINT \`FK_bc11fc8ee6ae88332f7a4479815\` FOREIGN KEY (\`dp_ttnId\`) REFERENCES \`DP_DOC_TTN\`(\`dp_id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`DP_LST_TtnItems\` DROP FOREIGN KEY \`FK_bc11fc8ee6ae88332f7a4479815\`
        `);
    await queryRunner.query(`
            DROP TABLE \`DP_LST_TtnItems\`
        `);
  }
}
