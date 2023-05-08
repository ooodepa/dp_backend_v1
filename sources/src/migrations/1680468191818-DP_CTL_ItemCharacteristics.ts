import { MigrationInterface, QueryRunner } from 'typeorm';

export class DPCTLItemCharacteristics1680468191818
  implements MigrationInterface
{
  name = 'DPCTLItemCharacteristics1680468191818';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE \`DP_CTL_ItemCharacteristics\` (
            \`dp_id\` int NOT NULL AUTO_INCREMENT,
            \`dp_name\` varchar(255) NOT NULL,
            \`dp_isHidden\` tinyint NOT NULL DEFAULT 0,
            UNIQUE INDEX \`UNI_ctlItemCharacteristics_name\` (\`dp_name\`),
            PRIMARY KEY (\`dp_id\`)
        ) ENGINE = InnoDB
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE \`DP_CTL_ItemCharacteristics\` DROP INDEX \`UNI_ctlItemCharacteristics_name\`
    `);
    await queryRunner.query(`
        DROP TABLE \`DP_CTL_ItemCharacteristics\`
    `);
  }
}
