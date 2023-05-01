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
            UNIQUE INDEX \`IDX_40a29531f16cdee3db2d13ba89\` (\`dp_name\`),
            PRIMARY KEY (\`dp_id\`)
        ) ENGINE = InnoDB
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE \`DP_CTL_ItemCharacteristics\` DROP INDEX \`IDX_40a29531f16cdee3db2d13ba89\`
    `);
    await queryRunner.query(`
        DROP TABLE \`DP_CTL_ItemCharacteristics\`
    `);
  }
}
