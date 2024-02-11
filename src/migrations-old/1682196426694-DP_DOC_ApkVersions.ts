import { MigrationInterface, QueryRunner } from 'typeorm';

export class DPDOCApkVersions1682196426694 implements MigrationInterface {
  name = 'DPDOCApkVersions1682196426694';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE \`DP_DOC_ApkVersions\` (
            \`dp_id\` int NOT NULL AUTO_INCREMENT,
            \`dp_date\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            \`dp_version\` varchar(24) NOT NULL,
            \`dp_url\` varchar(255) NOT NULL,
            PRIMARY KEY (\`dp_id\`)
        ) ENGINE = InnoDB
    `);

    await queryRunner.query(`
        INSERT \`DP_DOC_ApkVersions\` (\`dp_version\`, \`dp_url\`) VALUES
        ('0.7.0', 'https://drive.google.com/file/d/1DtZfPlj6QQByP0pklPRxzEiDalaNP4Cj/view?usp=share_link')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE \`DP_DOC_ApkVersions\`
    `);
  }
}
