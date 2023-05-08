import { MigrationInterface, QueryRunner } from 'typeorm';

export class DPCTLItemBrands1680776927307 implements MigrationInterface {
  name = 'DPCTLItemBrands1680776927307';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE \`DP_CTL_ItemBrands\` (
            \`dp_id\` int NOT NULL AUTO_INCREMENT,
            \`dp_name\` varchar(255) NOT NULL,
            \`dp_sortingIndex\` int NOT NULL DEFAULT '10000',
            \`dp_photoUrl\` varchar(255) NOT NULL DEFAULT '',
            \`dp_urlSegment\` varchar(255) NOT NULL,
            \`dp_seoKeywords\` varchar(255) NOT NULL DEFAULT '',
            \`dp_seoDescription\` varchar(255) NOT NULL DEFAULT '',
            \`dp_isHidden\` tinyint NOT NULL DEFAULT 0,
            UNIQUE INDEX \`UNI_ctlItemBrands_name\` (\`dp_name\`),
            UNIQUE INDEX \`UNI_ctlItemBrands_urlSegment\` (\`dp_urlSegment\`),
            UNIQUE INDEX \`UNI_ctlItemBrands_seoDescription\` (\`dp_seoDescription\`),
            PRIMARY KEY (\`dp_id\`)
        ) ENGINE = InnoDB
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_CTL_ItemCategories\`
        ADD \`dp_itemBrandId\` int NULL
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_CTL_ItemCategories\`
        ADD CONSTRAINT \`FK_a36c467066a5d281d3a8c777461\` FOREIGN KEY (\`dp_itemBrandId\`) REFERENCES \`DP_CTL_ItemBrands\`(\`dp_id\`) ON DELETE
        SET NULL ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE \`DP_CTL_ItemCategories\` DROP FOREIGN KEY \`FK_a36c467066a5d281d3a8c777461\`
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_CTL_ItemCategories\` DROP COLUMN \`dp_itemBrandId\`
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_CTL_ItemBrands\` DROP INDEX \`UNI_ctlItemBrands_seoDescription\`
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_CTL_ItemBrands\` DROP INDEX \`UNI_ctlItemBrands_urlSegment\`
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_CTL_ItemBrands\` DROP INDEX \`UNI_ctlItemBrands_name\`
    `);
    await queryRunner.query(`
        DROP TABLE \`DP_CTL_ItemBrands\`
    `);
  }
}
