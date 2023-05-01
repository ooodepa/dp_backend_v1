import { MigrationInterface, QueryRunner } from 'typeorm';

export class DPCTLItems1680469415362 implements MigrationInterface {
  name = 'DPCTLItems1680469415362';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE \`DP_CTL_Items\` (
            \`dp_id\` varchar(36) NOT NULL,
            \`dp_name\` varchar(255) NOT NULL,
            \`dp_model\` varchar(32) NOT NULL,
            \`dp_cost\` float NOT NULL,
            \`dp_photoUrl\` varchar(255) NOT NULL DEFAULT '',
            \`dp_itemCategoryId\` int NOT NULL,
            \`dp_seoKeywords\` varchar(255) NOT NULL DEFAULT '',
            \`dp_seoDescription\` varchar(255) NOT NULL DEFAULT '',
            UNIQUE INDEX \`IDX_a366cf1ff7d13533257352d448\` (\`dp_model\`),
            PRIMARY KEY (\`dp_id\`)
        ) ENGINE = InnoDB
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_CTL_Items\`
        ADD CONSTRAINT \`FK_78eb00f3436232d09c51da69a9e\` FOREIGN KEY (\`dp_itemCategoryId\`) REFERENCES \`DP_CTL_ItemCategories\`(\`dp_id\`) ON DELETE CASCADE ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
        CREATE TABLE \`DP_LST_ItemCharacteristics\` (
            \`dp_id\` int NOT NULL AUTO_INCREMENT,
            \`dp_itemId\` varchar(36) NOT NULL,
            \`dp_characteristicId\` int NOT NULL,
            \`dp_value\` varchar(255) NOT NULL,
            PRIMARY KEY (\`dp_id\`)
        ) ENGINE = InnoDB
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_LST_ItemCharacteristics\`
        ADD CONSTRAINT \`FK_0ff334c62ae0628c1c782043ddb\` FOREIGN KEY (\`dp_itemId\`) REFERENCES \`DP_CTL_Items\`(\`dp_id\`) ON DELETE CASCADE ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_LST_ItemCharacteristics\`
        ADD CONSTRAINT \`FK_d98a20967da040a269d4b46bd29\` FOREIGN KEY (\`dp_characteristicId\`) REFERENCES \`DP_CTL_ItemCharacteristics\`(\`dp_id\`) ON DELETE CASCADE ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
        CREATE TABLE \`DP_LST_ItemGalery\` (
            \`dp_id\` int NOT NULL AUTO_INCREMENT,
            \`dp_itemId\` varchar(36) NOT NULL,
            \`dp_photoUrl\` varchar(255) NOT NULL,
            PRIMARY KEY (\`dp_id\`)
        ) ENGINE = InnoDB
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_LST_ItemGalery\`
        ADD CONSTRAINT \`FK_50452c0ec7bd7d0f2b06421cb6a\` FOREIGN KEY (\`dp_itemId\`) REFERENCES \`DP_CTL_Items\`(\`dp_id\`) ON DELETE CASCADE ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE \`DP_LST_ItemGalery\` DROP FOREIGN KEY \`FK_50452c0ec7bd7d0f2b06421cb6a\`
    `);
    await queryRunner.query(`
        DROP TABLE \`DP_LST_ItemGalery\`
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_LST_ItemCharacteristics\` DROP FOREIGN KEY \`FK_d98a20967da040a269d4b46bd29\`
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_LST_ItemCharacteristics\` DROP FOREIGN KEY \`FK_0ff334c62ae0628c1c782043ddb\`
    `);
    await queryRunner.query(`
        DROP TABLE \`DP_LST_ItemCharacteristics\`
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_CTL_Items\` DROP FOREIGN KEY \`FK_78eb00f3436232d09c51da69a9e\`
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_CTL_Items\` DROP INDEX \`IDX_a366cf1ff7d13533257352d448\`
    `);
    await queryRunner.query(`
        DROP TABLE \`DP_CTL_Items\`
    `);
  }
}
