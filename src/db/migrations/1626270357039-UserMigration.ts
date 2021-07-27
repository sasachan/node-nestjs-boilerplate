import {MigrationInterface, QueryRunner} from "typeorm";

export class UserMigration1626270357039 implements MigrationInterface {
    name = 'UserMigration1626270357039'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `isActive` `Online` tinyint NOT NULL DEFAULT '1'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `Online` `isActive` tinyint NOT NULL DEFAULT '1'");
    }

}
