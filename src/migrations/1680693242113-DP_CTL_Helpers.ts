import { MigrationInterface, QueryRunner } from 'typeorm';

export class DPCTLHelpers1680693242113 implements MigrationInterface {
  name = 'DPCTLHelpers1680693242113';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE \`DP_CTL_Helpers\` (
            \`dp_id\` varchar(36) NOT NULL,
            \`dp_sortingIndex\` int NOT NULL DEFAULT '10000',
            \`dp_name\` varchar(255) NOT NULL,
            \`dp_text\` varchar(2048) NOT NULL DEFAULT '',
            \`dp_isHidden\` tinyint NOT NULL DEFAULT 0,
            UNIQUE INDEX \`UNI_ctlHelpers_name\` (\`dp_name\`),
            PRIMARY KEY (\`dp_id\`)
        ) ENGINE = InnoDB
    `);
    await queryRunner.query(`
        CREATE TABLE \`DP_LST_HelperContactTypes\` (
            \`dp_id\` int NOT NULL AUTO_INCREMENT,
            \`dp_helperId\` varchar(36) NOT NULL,
            \`dp_contactTypeId\` int NOT NULL,
            \`dp_value\` varchar(255) NOT NULL,
            \`dp_isHidden\` tinyint NOT NULL DEFAULT 0,
            PRIMARY KEY (\`dp_id\`)
        ) ENGINE = InnoDB
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_LST_HelperContactTypes\`
        ADD CONSTRAINT \`FK_ec6c5d7dee0a8b1351c861a814d\` FOREIGN KEY (\`dp_helperId\`) REFERENCES \`DP_CTL_Helpers\`(\`dp_id\`) ON DELETE CASCADE ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_LST_HelperContactTypes\`
        ADD CONSTRAINT \`FK_dd078b038508d9d611c033b9c0d\` FOREIGN KEY (\`dp_contactTypeId\`) REFERENCES \`DP_CTL_ContactTypes\`(\`dp_id\`) ON DELETE CASCADE ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE \`DP_LST_HelperContactTypes\` DROP FOREIGN KEY \`FK_dd078b038508d9d611c033b9c0d\`
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_LST_HelperContactTypes\` DROP FOREIGN KEY \`FK_ec6c5d7dee0a8b1351c861a814d\`
    `);
    await queryRunner.query(`
        DROP TABLE \`DP_LST_HelperContactTypes\`
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_CTL_Helpers\` DROP INDEX \`UNI_ctlHelpers_name\`
    `);
    await queryRunner.query(`
        DROP TABLE \`DP_CTL_Helpers\`
    `);
  }
}
