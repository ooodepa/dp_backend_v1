import { MigrationInterface, QueryRunner } from 'typeorm';

export class DPCTLUSERANONIM1700072010002 implements MigrationInterface {
  name = 'DPCTLUSERANONIM1700072010002';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`
    //   INSERT INTO \`DP_CTL_Users\` (
    //     \`dp_id\`, \`dp_login\`, \`dp_email\`,
    //     \`dp_passwordHash\`, \`dp_unp\`,
    //     \`dp_nameLegalEntity\`, \`dp_shortNameLegalEntity\`,
    //     \`dp_receptionPhone\`, \`dp_address\`,
    //     \`dp_firstName\`, \`dp_lastName\`, \`dp_middleName\`
    //   ) VALUES (
    //     -1, 'anonim', 'anonim@site.local',
    //     '', '',
    //     '', '',
    //     '', '',
    //     '', '', ''
    //   );
    // `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`
    //   DELETE FROM \`DP_CTL_Users\` WHERE \`dp_id\` = -1;
    // `);
  }
}
