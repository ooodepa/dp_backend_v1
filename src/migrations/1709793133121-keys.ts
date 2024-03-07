import { MigrationInterface, QueryRunner } from 'typeorm';

export class Keys1709793133121 implements MigrationInterface {
  name = 'Keys1709793133121';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP INDEX \`FK_a177f48a2b5cdcf7bdc81475b62\` ON \`DP_LST_ArticleAttachedLinks\`
        `);
    await queryRunner.query(`
            DROP INDEX \`FK_50452c0ec7bd7d0f2b06421cb6a\` ON \`DP_LST_ItemGalery\`
        `);
    await queryRunner.query(`
            DROP INDEX \`FK_0ff334c62ae0628c1c782043ddb\` ON \`DP_LST_ItemCharacteristics\`
        `);
    await queryRunner.query(`
            DROP INDEX \`FK_d98a20967da040a269d4b46bd29\` ON \`DP_LST_ItemCharacteristics\`
        `);
    await queryRunner.query(`
            DROP INDEX \`FK_a36c467066a5d281d3a8c777461\` ON \`DP_CTL_ItemCategories\`
        `);
    await queryRunner.query(`
            DROP INDEX \`FK_6e52e8f24b7dd07a2b9a03ae96c\` ON \`DP_LST_FavoriteItems\`
        `);
    await queryRunner.query(`
            DROP INDEX \`FK_bdec86e8bc48438d5aef13361b2\` ON \`DP_LST_FavoriteItems\`
        `);
    await queryRunner.query(`
            DROP INDEX \`FK_dd078b038508d9d611c033b9c0d\` ON \`DP_LST_HelperContactTypes\`
        `);
    await queryRunner.query(`
            DROP INDEX \`FK_ec6c5d7dee0a8b1351c861a814d\` ON \`DP_LST_HelperContactTypes\`
        `);
    await queryRunner.query(`
            DROP INDEX \`FK_17ef6a25e7eaf3496508d98e0c5\` ON \`DP_LST_OrderItems\`
        `);
    await queryRunner.query(`
            DROP INDEX \`FK_365d9f1baaafd6c8a5d3314ecdf\` ON \`DP_LST_OrderItems\`
        `);
    await queryRunner.query(`
            DROP INDEX \`FK_2ad9d13bc5ce1b4b9c1a65297cf\` ON \`DP_DOC_OrderStatuses\`
        `);
    await queryRunner.query(`
            DROP INDEX \`FK_e6f4202807824a799251356b67c\` ON \`DP_DOC_Orders\`
        `);
    await queryRunner.query(`
            DROP INDEX \`FK_882e99baf40f061e8338534fe34\` ON \`DP_DOC_Sessions\`
        `);
    await queryRunner.query(`
            DROP INDEX \`FK_8b3a33663bda74512745a33ab01\` ON \`DP_DOC_UserRoles\`
        `);
    await queryRunner.query(`
            DROP INDEX \`FK_aa033086aa52278cfdbe67f458a\` ON \`DP_DOC_UserRoles\`
        `);
    await queryRunner.query(`
            DROP INDEX \`FK_363e09bcea5291c99d965ef71ad\` ON \`DP_DOC_ChangeEmail\`
        `);
    await queryRunner.query(`
            DROP INDEX \`FK_074cacbc732ee419e92afcd6c02\` ON \`DP_DOC_ActivationAccount\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`DP_LST_ArticleAttachedLinks\`
            ADD CONSTRAINT \`FK_a177f48a2b5cdcf7bdc81475b62\` FOREIGN KEY (\`dp_articleId\`) REFERENCES \`DP_DOC_Articles\`(\`dp_id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`DP_LST_ItemGalery\`
            ADD CONSTRAINT \`FK_50452c0ec7bd7d0f2b06421cb6a\` FOREIGN KEY (\`dp_itemId\`) REFERENCES \`DP_CTL_Items\`(\`dp_id\`) ON DELETE CASCADE ON UPDATE NO ACTION
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
            ALTER TABLE \`DP_CTL_ItemCategories\`
            ADD CONSTRAINT \`FK_a36c467066a5d281d3a8c777461\` FOREIGN KEY (\`dp_itemBrandId\`) REFERENCES \`DP_CTL_ItemBrands\`(\`dp_id\`) ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`DP_CTL_Items\`
            ADD CONSTRAINT \`FK_78eb00f3436232d09c51da69a9e\` FOREIGN KEY (\`dp_itemCategoryId\`) REFERENCES \`DP_CTL_ItemCategories\`(\`dp_id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`DP_LST_FavoriteItems\`
            ADD CONSTRAINT \`FK_bdec86e8bc48438d5aef13361b2\` FOREIGN KEY (\`dp_userId\`) REFERENCES \`DP_CTL_Users\`(\`dp_id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`DP_LST_FavoriteItems\`
            ADD CONSTRAINT \`FK_6e52e8f24b7dd07a2b9a03ae96c\` FOREIGN KEY (\`dp_itemId\`) REFERENCES \`DP_CTL_Items\`(\`dp_id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`DP_LST_HelperContactTypes\`
            ADD CONSTRAINT \`FK_ec6c5d7dee0a8b1351c861a814d\` FOREIGN KEY (\`dp_helperId\`) REFERENCES \`DP_CTL_Helpers\`(\`dp_id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`DP_LST_HelperContactTypes\`
            ADD CONSTRAINT \`FK_dd078b038508d9d611c033b9c0d\` FOREIGN KEY (\`dp_contactTypeId\`) REFERENCES \`DP_CTL_ContactTypes\`(\`dp_id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`DP_LST_OrderItems\`
            ADD CONSTRAINT \`FK_365d9f1baaafd6c8a5d3314ecdf\` FOREIGN KEY (\`dp_orderId\`) REFERENCES \`DP_DOC_Orders\`(\`dp_id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`DP_LST_OrderItems\`
            ADD CONSTRAINT \`FK_17ef6a25e7eaf3496508d98e0c5\` FOREIGN KEY (\`dp_itemId\`) REFERENCES \`DP_CTL_Items\`(\`dp_id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`DP_DOC_OrderStatuses\`
            ADD CONSTRAINT \`FK_2ad9d13bc5ce1b4b9c1a65297cf\` FOREIGN KEY (\`dp_orderId\`) REFERENCES \`DP_DOC_Orders\`(\`dp_id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`DP_DOC_Orders\`
            ADD CONSTRAINT \`FK_e6f4202807824a799251356b67c\` FOREIGN KEY (\`dp_userId\`) REFERENCES \`DP_CTL_Users\`(\`dp_id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`DP_DOC_Sessions\`
            ADD CONSTRAINT \`FK_882e99baf40f061e8338534fe34\` FOREIGN KEY (\`dp_userId\`) REFERENCES \`DP_CTL_Users\`(\`dp_id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`DP_DOC_UserRoles\`
            ADD CONSTRAINT \`FK_aa033086aa52278cfdbe67f458a\` FOREIGN KEY (\`dp_userId\`) REFERENCES \`DP_CTL_Users\`(\`dp_id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`DP_DOC_UserRoles\`
            ADD CONSTRAINT \`FK_8b3a33663bda74512745a33ab01\` FOREIGN KEY (\`dp_roleId\`) REFERENCES \`DP_CTL_Roles\`(\`dp_id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`DP_DOC_ChangeEmail\`
            ADD CONSTRAINT \`FK_363e09bcea5291c99d965ef71ad\` FOREIGN KEY (\`dp_userId\`) REFERENCES \`DP_CTL_Users\`(\`dp_id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`DP_DOC_ActivationAccount\`
            ADD CONSTRAINT \`FK_074cacbc732ee419e92afcd6c02\` FOREIGN KEY (\`dp_userId\`) REFERENCES \`DP_CTL_Users\`(\`dp_id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`DP_DOC_ActivationAccount\` DROP FOREIGN KEY \`FK_074cacbc732ee419e92afcd6c02\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`DP_DOC_ChangeEmail\` DROP FOREIGN KEY \`FK_363e09bcea5291c99d965ef71ad\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`DP_DOC_UserRoles\` DROP FOREIGN KEY \`FK_8b3a33663bda74512745a33ab01\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`DP_DOC_UserRoles\` DROP FOREIGN KEY \`FK_aa033086aa52278cfdbe67f458a\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`DP_DOC_Sessions\` DROP FOREIGN KEY \`FK_882e99baf40f061e8338534fe34\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`DP_DOC_Orders\` DROP FOREIGN KEY \`FK_e6f4202807824a799251356b67c\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`DP_DOC_OrderStatuses\` DROP FOREIGN KEY \`FK_2ad9d13bc5ce1b4b9c1a65297cf\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`DP_LST_OrderItems\` DROP FOREIGN KEY \`FK_17ef6a25e7eaf3496508d98e0c5\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`DP_LST_OrderItems\` DROP FOREIGN KEY \`FK_365d9f1baaafd6c8a5d3314ecdf\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`DP_LST_HelperContactTypes\` DROP FOREIGN KEY \`FK_dd078b038508d9d611c033b9c0d\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`DP_LST_HelperContactTypes\` DROP FOREIGN KEY \`FK_ec6c5d7dee0a8b1351c861a814d\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`DP_LST_FavoriteItems\` DROP FOREIGN KEY \`FK_6e52e8f24b7dd07a2b9a03ae96c\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`DP_LST_FavoriteItems\` DROP FOREIGN KEY \`FK_bdec86e8bc48438d5aef13361b2\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`DP_CTL_Items\` DROP FOREIGN KEY \`FK_78eb00f3436232d09c51da69a9e\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`DP_CTL_ItemCategories\` DROP FOREIGN KEY \`FK_a36c467066a5d281d3a8c777461\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`DP_LST_ItemCharacteristics\` DROP FOREIGN KEY \`FK_d98a20967da040a269d4b46bd29\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`DP_LST_ItemCharacteristics\` DROP FOREIGN KEY \`FK_0ff334c62ae0628c1c782043ddb\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`DP_LST_ItemGalery\` DROP FOREIGN KEY \`FK_50452c0ec7bd7d0f2b06421cb6a\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`DP_LST_ArticleAttachedLinks\` DROP FOREIGN KEY \`FK_a177f48a2b5cdcf7bdc81475b62\`
        `);
    await queryRunner.query(`
            CREATE INDEX \`FK_074cacbc732ee419e92afcd6c02\` ON \`DP_DOC_ActivationAccount\` (\`dp_userId\`)
        `);
    await queryRunner.query(`
            CREATE INDEX \`FK_363e09bcea5291c99d965ef71ad\` ON \`DP_DOC_ChangeEmail\` (\`dp_userId\`)
        `);
    await queryRunner.query(`
            CREATE INDEX \`FK_aa033086aa52278cfdbe67f458a\` ON \`DP_DOC_UserRoles\` (\`dp_userId\`)
        `);
    await queryRunner.query(`
            CREATE INDEX \`FK_8b3a33663bda74512745a33ab01\` ON \`DP_DOC_UserRoles\` (\`dp_roleId\`)
        `);
    await queryRunner.query(`
            CREATE INDEX \`FK_882e99baf40f061e8338534fe34\` ON \`DP_DOC_Sessions\` (\`dp_userId\`)
        `);
    await queryRunner.query(`
            CREATE INDEX \`FK_e6f4202807824a799251356b67c\` ON \`DP_DOC_Orders\` (\`dp_userId\`)
        `);
    await queryRunner.query(`
            CREATE INDEX \`FK_2ad9d13bc5ce1b4b9c1a65297cf\` ON \`DP_DOC_OrderStatuses\` (\`dp_orderId\`)
        `);
    await queryRunner.query(`
            CREATE INDEX \`FK_365d9f1baaafd6c8a5d3314ecdf\` ON \`DP_LST_OrderItems\` (\`dp_orderId\`)
        `);
    await queryRunner.query(`
            CREATE INDEX \`FK_17ef6a25e7eaf3496508d98e0c5\` ON \`DP_LST_OrderItems\` (\`dp_itemId\`)
        `);
    await queryRunner.query(`
            CREATE INDEX \`FK_ec6c5d7dee0a8b1351c861a814d\` ON \`DP_LST_HelperContactTypes\` (\`dp_helperId\`)
        `);
    await queryRunner.query(`
            CREATE INDEX \`FK_dd078b038508d9d611c033b9c0d\` ON \`DP_LST_HelperContactTypes\` (\`dp_contactTypeId\`)
        `);
    await queryRunner.query(`
            CREATE INDEX \`FK_bdec86e8bc48438d5aef13361b2\` ON \`DP_LST_FavoriteItems\` (\`dp_userId\`)
        `);
    await queryRunner.query(`
            CREATE INDEX \`FK_6e52e8f24b7dd07a2b9a03ae96c\` ON \`DP_LST_FavoriteItems\` (\`dp_itemId\`)
        `);
    await queryRunner.query(`
            CREATE INDEX \`FK_a36c467066a5d281d3a8c777461\` ON \`DP_CTL_ItemCategories\` (\`dp_itemBrandId\`)
        `);
    await queryRunner.query(`
            CREATE INDEX \`FK_d98a20967da040a269d4b46bd29\` ON \`DP_LST_ItemCharacteristics\` (\`dp_characteristicId\`)
        `);
    await queryRunner.query(`
            CREATE INDEX \`FK_0ff334c62ae0628c1c782043ddb\` ON \`DP_LST_ItemCharacteristics\` (\`dp_itemId\`)
        `);
    await queryRunner.query(`
            CREATE INDEX \`FK_50452c0ec7bd7d0f2b06421cb6a\` ON \`DP_LST_ItemGalery\` (\`dp_itemId\`)
        `);
    await queryRunner.query(`
            CREATE INDEX \`FK_a177f48a2b5cdcf7bdc81475b62\` ON \`DP_LST_ArticleAttachedLinks\` (\`dp_articleId\`)
        `);
  }
}
