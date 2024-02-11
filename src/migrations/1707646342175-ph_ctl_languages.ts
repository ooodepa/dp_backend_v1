import { MigrationInterface, QueryRunner } from 'typeorm';

export class PhCtlLanguages1707646342175 implements MigrationInterface {
  name = 'PhCtlLanguages1707646342175';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`ph_ctl_languages\` (
                \`ph_id\` int NOT NULL AUTO_INCREMENT,
                \`ph_1c_code\` varchar(8) NOT NULL,
                \`ph_1c_description\` varchar(16) NOT NULL,
                UNIQUE INDEX \`ph_uni_ctl_languages_1c_code\` (\`ph_1c_code\`),
                UNIQUE INDEX \`ph_uni_ctl_languages_1c_description\` (\`ph_1c_description\`),
                PRIMARY KEY (\`ph_id\`)
            ) ENGINE = InnoDB
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP INDEX \`ph_uni_ctl_languages_1c_description\` ON \`ph_ctl_languages\`
        `);
    await queryRunner.query(`
            DROP INDEX \`ph_uni_ctl_languages_1c_code\` ON \`ph_ctl_languages\`
        `);
    await queryRunner.query(`
            DROP TABLE \`ph_ctl_languages\`
        `);
  }
}
