import { MigrationInterface, QueryRunner } from 'typeorm';

export class DPDOCArticles1680550578161 implements MigrationInterface {
  name = 'DPDOCArticles1680550578161';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE \`DP_DOC_Articles\` (
            \`dp_id\` varchar(36) NOT NULL,
            \`dp_name\` varchar(255) NOT NULL,
            \`dp_date\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            \`dp_urlSegment\` varchar(255) NOT NULL,
            \`dp_photoUrl\` varchar(255) NOT NULL DEFAULT '',
            \`dp_text\` varchar(8192) NOT NULL DEFAULT '',
            \`dp_sortingIndex\` int NOT NULL DEFAULT '10000',
            \`dp_seoKeywords\` varchar(255) NOT NULL DEFAULT '',
            \`dp_seoDescription\` varchar(255) NOT NULL DEFAULT '',
            \`dp_isHidden\` tinyint NOT NULL DEFAULT 0,
            UNIQUE INDEX \`UNI_docArticles_name\` (\`dp_name\`),
            UNIQUE INDEX \`UNI_docArticles_urlSegment\` (\`dp_urlSegment\`),
            UNIQUE INDEX \`UNI_docArticles_seoDescription\` (\`dp_seoDescription\`),
            PRIMARY KEY (\`dp_id\`)
        ) ENGINE = InnoDB
    `);
    await queryRunner.query(`
        CREATE TABLE \`DP_LST_ArticleAttachedLinks\` (
            \`dp_id\` int NOT NULL AUTO_INCREMENT,
            \`dp_name\` varchar(255) NOT NULL,
            \`dp_url\` varchar(255) NOT NULL,
            \`dp_articleId\` varchar(255) NOT NULL,
            PRIMARY KEY (\`dp_id\`)
        ) ENGINE = InnoDB
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_LST_ArticleAttachedLinks\`
        ADD CONSTRAINT \`FK_a177f48a2b5cdcf7bdc81475b62\` FOREIGN KEY (\`dp_articleId\`) REFERENCES \`DP_DOC_Articles\`(\`dp_id\`) ON DELETE CASCADE ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE \`DP_LST_ArticleAttachedLinks\` DROP FOREIGN KEY \`FK_a177f48a2b5cdcf7bdc81475b62\`
    `);
    await queryRunner.query(`
        DROP TABLE \`DP_LST_ArticleAttachedLinks\`
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_DOC_Articles\` DROP INDEX \`UNI_docArticles_seoDescription\`
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_DOC_Articles\` DROP INDEX \`UNI_docArticles_urlSegment\`
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_DOC_Articles\` DROP INDEX \`UNI_docArticles_name\`
    `);
    await queryRunner.query(`
        DROP TABLE \`DP_DOC_Articles\`
    `);
  }
}
