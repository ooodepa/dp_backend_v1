import { MigrationInterface, QueryRunner } from 'typeorm';

export class DPDOCUserRoles1681367431449 implements MigrationInterface {
  name = 'DPDOCUserRoles1681367431449';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE \`DP_DOC_UserRoles\` (
            \`dp_id\` int NOT NULL AUTO_INCREMENT,
            \`dp_date\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            \`dp_userId\` int NOT NULL,
            \`dp_roleId\` int NOT NULL,
            PRIMARY KEY (\`dp_id\`)
        ) ENGINE = InnoDB
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_DOC_UserRoles\`
        ADD CONSTRAINT \`FK_aa033086aa52278cfdbe67f458a\` FOREIGN KEY (\`dp_userId\`) REFERENCES \`DP_CTL_Users\`(\`dp_id\`) ON DELETE CASCADE ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_DOC_UserRoles\`
        ADD CONSTRAINT \`FK_8b3a33663bda74512745a33ab01\` FOREIGN KEY (\`dp_roleId\`) REFERENCES \`DP_CTL_Roles\`(\`dp_id\`) ON DELETE CASCADE ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE \`DP_DOC_UserRoles\` DROP FOREIGN KEY \`FK_8b3a33663bda74512745a33ab01\`
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_DOC_UserRoles\` DROP FOREIGN KEY \`FK_aa033086aa52278cfdbe67f458a\`
    `);
    await queryRunner.query(`
        DROP TABLE \`DP_DOC_UserRoles\`
    `);
  }
}
