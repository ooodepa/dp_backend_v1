import { MigrationInterface, QueryRunner } from 'typeorm';

export class DPCTLCommunicationTypes1680555268495
  implements MigrationInterface
{
  name = 'DPCTLContactTypes1680555268495';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE \`DP_CTL_ContactTypes\` (
            \`dp_id\` int NOT NULL AUTO_INCREMENT,
            \`dp_name\` varchar(255) NOT NULL,
            \`dp_isHidden\` tinyint NOT NULL DEFAULT 0,
            UNIQUE INDEX \`UNI_ctlContactTypes_name\` (\`dp_name\`),
            PRIMARY KEY (\`dp_id\`)
        ) ENGINE = InnoDB
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE \`DP_CTL_ContactTypes\` DROP INDEX \`UNI_ctlContactTypes_name\`
    `);
    await queryRunner.query(`
        DROP TABLE \`DP_CTL_ContactTypes\`
    `);
  }
}
