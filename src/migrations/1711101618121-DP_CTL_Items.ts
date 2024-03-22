import { MigrationInterface, QueryRunner } from 'typeorm';

export class DPCTLItems1711101618121 implements MigrationInterface {
  name = 'DPCTLItems1711101618121';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`DP_CTL_Items\`
            ADD \`dp_isFolder\` tinyint NOT NULL DEFAULT 0
        `);
    await queryRunner.query(`
            ALTER TABLE \`DP_CTL_Items\`
            ADD \`dp_parentId\` varchar(255) NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`DP_CTL_Items\` DROP COLUMN \`dp_parentId\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`DP_CTL_Items\` DROP COLUMN \`dp_isFolder\`
        `);
  }
}
