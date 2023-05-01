import { MigrationInterface, QueryRunner } from 'typeorm';

export class DPCTLItemCategories1680463930462 implements MigrationInterface {
  name = 'DPCTLItemCategories1680463930462';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE \`DP_CTL_ItemCategories\` (
            \`dp_id\` int NOT NULL AUTO_INCREMENT,
            \`dp_name\` varchar(255) NOT NULL,
            \`dp_sortingIndex\` int NOT NULL DEFAULT '10000',
            \`dp_photoUrl\` varchar(255) NOT NULL DEFAULT '',
            \`dp_urlSegment\` varchar(255) NOT NULL,
            \`dp_seoKeywords\` varchar(255) NOT NULL DEFAULT '',
            \`dp_seoDescription\` varchar(255) NOT NULL DEFAULT '',
            \`dp_isHidden\` tinyint NOT NULL DEFAULT 0,
            UNIQUE INDEX \`IDX_b8cf6d9f5d710f523e80e47b09\` (\`dp_name\`),
            UNIQUE INDEX \`IDX_11b3857fb725a0cab0c0100a12\` (\`dp_urlSegment\`),
            PRIMARY KEY (\`dp_id\`)
        ) ENGINE = InnoDB
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE \`DP_CTL_ItemCategories\` DROP INDEX \`IDX_11b3857fb725a0cab0c0100a12\`
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_CTL_ItemCategories\` DROP INDEX \`IDX_b8cf6d9f5d710f523e80e47b09\`
    `);
    await queryRunner.query(`
        DROP TABLE \`DP_CTL_ItemCategories\`
    `);
  }
}
