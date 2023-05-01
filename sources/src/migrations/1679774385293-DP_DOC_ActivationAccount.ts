import { MigrationInterface, QueryRunner } from 'typeorm';

export class DPDOCActivationAccount1679774385293 implements MigrationInterface {
  name = 'DPDOCActivationAccount1679774385293';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE \`DP_DOC_ActivationAccount\` (
            \`dp_id\` int NOT NULL AUTO_INCREMENT,
            \`dp_date\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            \`dp_token\` varchar(255) NOT NULL,
            \`dp_userId\` int NOT NULL,
            \`dp_isActivated\` tinyint NOT NULL DEFAULT 0,
            PRIMARY KEY (\`dp_id\`)
        ) ENGINE = InnoDB
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_DOC_ActivationAccount\`
        ADD CONSTRAINT \`FK_074cacbc732ee419e92afcd6c02\` FOREIGN KEY (\`dp_userId\`) REFERENCES \`DP_CTL_Users\`(\`dp_id\`) ON DELETE CASCADE ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE \`DP_DOC_ActivationAccount\` DROP FOREIGN KEY \`FK_074cacbc732ee419e92afcd6c02\`
    `);
    await queryRunner.query(`
        DROP TABLE \`DP_DOC_ActivationAccount\`
    `);
  }
}
