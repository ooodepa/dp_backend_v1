import { MigrationInterface, QueryRunner } from 'typeorm';

export class PhCtlSeoPages1707647209399 implements MigrationInterface {
  name = 'PhCtlSeoPages1707647209399';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`ph_ctl_seo_pages\` (
                \`ph_id\` varchar(36) NOT NULL,
                \`ph_1c_code\` varchar(255) NOT NULL,
                \`ph_1c_name\` varchar(255) NOT NULL,
                \`ph_html_title\` varchar(255) NOT NULL,
                \`ph_html_description\` varchar(2048) NOT NULL,
                \`ph_html_keywords\` varchar(2048) NOT NULL,
                \`ph_sitemap_loc\` varchar(2048) NOT NULL,
                \`ph_sitemap_lastmod\` timestamp NOT NULL,
                \`ph_sitemap_changefreq\` varchar(16) NOT NULL,
                \`ph_sitemap_priority\` float NOT NULL,
                \`ph_rich_content\` text NOT NULL,
                \`ph_language_id\` int NULL,
                UNIQUE INDEX \`ph_uni_ctl_seo_pages_1c_code\` (\`ph_1c_code\`),
                UNIQUE INDEX \`ph_uni_ctl_seo_pages_1c_name\` (\`ph_1c_name\`),
                UNIQUE INDEX \`ph_uni_ctl_seo_pages_html_title\` (\`ph_html_title\`),
                UNIQUE INDEX \`ph_uni_ctl_seo_pages_html_description\` (\`ph_html_description\`),
                UNIQUE INDEX \`ph_uni_ctl_sitemap_loc\` (\`ph_sitemap_loc\`),
                PRIMARY KEY (\`ph_id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            ALTER TABLE \`ph_ctl_seo_pages\`
            ADD CONSTRAINT \`FK_ce5a4470f4f80e3261dc72eb833\` FOREIGN KEY (\`ph_language_id\`) REFERENCES \`ph_ctl_languages\`(\`ph_id\`) ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`ph_ctl_seo_pages\` DROP FOREIGN KEY \`FK_ce5a4470f4f80e3261dc72eb833\`
        `);
    await queryRunner.query(`
            DROP INDEX \`ph_uni_ctl_sitemap_loc\` ON \`ph_ctl_seo_pages\`
        `);
    await queryRunner.query(`
            DROP INDEX \`ph_uni_ctl_seo_pages_html_description\` ON \`ph_ctl_seo_pages\`
        `);
    await queryRunner.query(`
            DROP INDEX \`ph_uni_ctl_seo_pages_html_title\` ON \`ph_ctl_seo_pages\`
        `);
    await queryRunner.query(`
            DROP INDEX \`ph_uni_ctl_seo_pages_1c_name\` ON \`ph_ctl_seo_pages\`
        `);
    await queryRunner.query(`
            DROP INDEX \`ph_uni_ctl_seo_pages_1c_code\` ON \`ph_ctl_seo_pages\`
        `);
    await queryRunner.query(`
            DROP TABLE \`ph_ctl_seo_pages\`
        `);
  }
}
