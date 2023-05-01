import { MigrationInterface, QueryRunner } from 'typeorm';

export class DPDOCSessions1679832495901 implements MigrationInterface {
  name = 'DPDOCSessions1679832495901';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE \`DP_DOC_Sessions\` (
            \`dp_id\` int NOT NULL AUTO_INCREMENT,
            \`dp_date\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            \`dp_ip\` varchar(255) NOT NULL,
            \`dp_agent\` varchar(255) NOT NULL,
            \`dp_accessToken\` varchar(255) NOT NULL,
            \`dp_refreshToken\` varchar(255) NOT NULL,
            \`dp_userId\` int NOT NULL,
            PRIMARY KEY (\`dp_id\`)
        ) ENGINE = InnoDB
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_DOC_Sessions\`
        ADD CONSTRAINT \`FK_882e99baf40f061e8338534fe34\` FOREIGN KEY (\`dp_userId\`) REFERENCES \`DP_CTL_Users\`(\`dp_id\`) ON DELETE CASCADE ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE \`DP_DOC_Sessions\` DROP FOREIGN KEY \`FK_882e99baf40f061e8338534fe34\`
    `);
    await queryRunner.query(`
        DROP TABLE \`DP_DOC_Sessions\`
    `);
  }
}
