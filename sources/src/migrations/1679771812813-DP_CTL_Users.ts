import { MigrationInterface, QueryRunner } from 'typeorm';

export class DPCTLUsers1679771812813 implements MigrationInterface {
  name = 'DPCTLUsers1679771812813';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE \`DP_CTL_Users\` (
            \`dp_id\` int NOT NULL AUTO_INCREMENT,
            \`dp_login\` varchar(64) NOT NULL,
            \`dp_email\` varchar(64) NOT NULL,
            \`dp_passwordHash\` varchar(60) NOT NULL,
            \`dp_unp\` varchar(13) NOT NULL,
            \`dp_nameLegalEntity\` varchar(255) NOT NULL,
            \`dp_shortNameLegalEntity\` varchar(255) NOT NULL,
            \`dp_receptionPhone\` varchar(13) NOT NULL,
            \`dp_address\` varchar(255) NOT NULL,
            \`dp_firstName\` varchar(32) NOT NULL,
            \`dp_lastName\` varchar(32) NOT NULL,
            \`dp_middleName\` varchar(32) NOT NULL,
            UNIQUE INDEX \`IDX_dcf0f04c8479c5e51b3559c982\` (\`dp_login\`),
            UNIQUE INDEX \`IDX_0e72cc05d134241526e13449e6\` (\`dp_email\`),
            PRIMARY KEY (\`dp_id\`)
        ) ENGINE = InnoDB
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP INDEX \`IDX_0e72cc05d134241526e13449e6\` ON \`DP_CTL_Users\`
    `);
    await queryRunner.query(`
        DROP INDEX \`IDX_dcf0f04c8479c5e51b3559c982\` ON \`DP_CTL_Users\`
    `);
    await queryRunner.query(`
        DROP TABLE \`DP_CTL_Users\`
    `);
  }
}
