import { MigrationInterface, QueryRunner } from 'typeorm';

export class DPLSTFavoriteItems1682350518737 implements MigrationInterface {
  name = 'DPLSTFavoriteItems1682350518737';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE \`DP_LST_FavoriteItems\` (
            \`dp_id\` int NOT NULL AUTO_INCREMENT,
            \`dp_userId\` int NOT NULL,
            \`dp_itemId\` varchar(36) NOT NULL,
            PRIMARY KEY (\`dp_id\`)
        ) ENGINE = InnoDB
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_LST_FavoriteItems\`
        ADD CONSTRAINT \`FK_bdec86e8bc48438d5aef13361b2\` FOREIGN KEY (\`dp_userId\`) REFERENCES \`DP_CTL_Users\`(\`dp_id\`) ON DELETE CASCADE ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_LST_FavoriteItems\`
        ADD CONSTRAINT \`FK_6e52e8f24b7dd07a2b9a03ae96c\` FOREIGN KEY (\`dp_itemId\`) REFERENCES \`DP_CTL_Items\`(\`dp_id\`) ON DELETE CASCADE ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE \`DP_LST_FavoriteItems\` DROP FOREIGN KEY \`FK_6e52e8f24b7dd07a2b9a03ae96c\`
    `);
    await queryRunner.query(`
        ALTER TABLE \`DP_LST_FavoriteItems\` DROP FOREIGN KEY \`FK_bdec86e8bc48438d5aef13361b2\`
    `);
    await queryRunner.query(`
        DROP TABLE \`DP_LST_FavoriteItems\`
    `);
  }
}
