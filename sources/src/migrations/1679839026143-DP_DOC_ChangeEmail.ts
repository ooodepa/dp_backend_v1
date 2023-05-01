import { MigrationInterface, QueryRunner } from 'typeorm';

export class DPDOCChangeEmail1679839026143 implements MigrationInterface {
  name = 'DPDOCChangeEmail1679839026143';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE \`DP_DOC_ChangeEmail\` (
            \`dp_id\` int NOT NULL AUTO_INCREMENT,
            \`dp_date\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            \`dp_token\` varchar(255) NOT NULL,
            \`dp_oldEmail\` varchar(255) NOT NULL,
            \`dp_newEmail\` varchar(255) NOT NULL,
            \`dp_userId\` int NOT NULL,
            \`dp_isClosed\` tinyint NOT NULL DEFAULT 0,
            PRIMARY KEY (\`dp_id\`)
        ) ENGINE = InnoDB
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_DOC_ChangeEmail\`
        ADD CONSTRAINT \`FK_363e09bcea5291c99d965ef71ad\` FOREIGN KEY (\`dp_userId\`) REFERENCES \`DP_CTL_Users\`(\`dp_id\`) ON DELETE CASCADE ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE \`DP_DOC_ChangeEmail\` DROP FOREIGN KEY \`FK_363e09bcea5291c99d965ef71ad\`
    `);
    await queryRunner.query(`
        DROP TABLE \`DP_DOC_ChangeEmail\`
    `);
  }
}
