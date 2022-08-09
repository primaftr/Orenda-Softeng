import { MigrationInterface, QueryRunner } from "typeorm";

export class UserTask1660003133168 implements MigrationInterface {
    name = 'UserTask1660003133168'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tasks\` (\`id\` int NOT NULL AUTO_INCREMENT, \`task\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_19bbb92c7d8cfded654386656b\` (\`task\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tasks_email_user\` (\`tasksId\` int NOT NULL, \`userId\` int NOT NULL, INDEX \`IDX_21634fd5fb0b8ac84df9f92f58\` (\`tasksId\`), INDEX \`IDX_3d59c99271747ffc6da306abba\` (\`userId\`), PRIMARY KEY (\`tasksId\`, \`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tasks_email_user\` ADD CONSTRAINT \`FK_21634fd5fb0b8ac84df9f92f58d\` FOREIGN KEY (\`tasksId\`) REFERENCES \`tasks\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`tasks_email_user\` ADD CONSTRAINT \`FK_3d59c99271747ffc6da306abba0\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tasks_email_user\` DROP FOREIGN KEY \`FK_3d59c99271747ffc6da306abba0\``);
        await queryRunner.query(`ALTER TABLE \`tasks_email_user\` DROP FOREIGN KEY \`FK_21634fd5fb0b8ac84df9f92f58d\``);
        await queryRunner.query(`DROP INDEX \`IDX_3d59c99271747ffc6da306abba\` ON \`tasks_email_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_21634fd5fb0b8ac84df9f92f58\` ON \`tasks_email_user\``);
        await queryRunner.query(`DROP TABLE \`tasks_email_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_19bbb92c7d8cfded654386656b\` ON \`tasks\``);
        await queryRunner.query(`DROP TABLE \`tasks\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
