import { MigrationInterface, QueryRunner } from 'typeorm';

export class DPCTLRoles1681355587199 implements MigrationInterface {
  name = 'DPCTLRoles1681355587199';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE \`DP_CTL_Roles\` (
            \`dp_id\` int NOT NULL AUTO_INCREMENT,
            \`dp_name\` varchar(8) NOT NULL,
            UNIQUE INDEX \`IDX_1db4050abccb069e00f27486e4\` (\`dp_name\`),
            PRIMARY KEY (\`dp_id\`)
        ) ENGINE = InnoDB
    `);
    await queryRunner.query(`
        INSERT INTO \`DP_CTL_Roles\` (\`dp_id\`, \`dp_name\`) VALUES
        (1, 'ADMIN'),
        (2, 'MODER')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE \`DP_CTL_Roles\` DROP INDEX \`IDX_1db4050abccb069e00f27486e4\`
    `);
    await queryRunner.query(`
        DROP TABLE \`DP_CTL_Roles\`
    `);
  }
}
