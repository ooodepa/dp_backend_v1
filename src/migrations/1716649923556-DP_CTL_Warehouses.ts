import { MigrationInterface, QueryRunner } from 'typeorm';

export class DPCTLWarehouses1716649923556 implements MigrationInterface {
  name = 'DPCTLWarehouses1716649923556';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`DP_CTL_Warehouses\` (
                \`dp_id\` varchar(255) NOT NULL,
                \`dp_name\` varchar(255) NULL,
                PRIMARY KEY (\`dp_id\`)
            ) ENGINE = InnoDB
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE \`DP_CTL_Warehouses\`
        `);
  }
}
