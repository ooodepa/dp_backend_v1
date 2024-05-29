import { MigrationInterface, QueryRunner } from 'typeorm';

export class DPCTL_Сounterparties1716650615748 implements MigrationInterface {
  name = 'DPCTL_Сounterparties1716650615748';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`DP_CTL_Сounterparties\` (
                \`dp_id\` varchar(255) NOT NULL,
                \`dp_unp\` varchar(255) NOT NULL,
                \`dp_fullnameName\` varchar(255) NOT NULL,
                \`dp_shortName\` varchar(255) NOT NULL,
                \`dp_address\` varchar(255) NOT NULL,
                \`dp_mnsCode\` int NOT NULL,
                \`dp_mnsName\` varchar(255) NOT NULL,
                \`dp_regDate\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`dp_ttn_adres_gruzootpravitelya\` varchar(255) NOT NULL,
                \`dp_ttn_adres_punkt_razgruzki\` varchar(255) NOT NULL,
                PRIMARY KEY (\`dp_id\`)
            ) ENGINE = InnoDB
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE \`DP_CTL_Сounterparties\`
        `);
  }
}
