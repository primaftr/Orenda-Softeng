"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTask1660003133168 = void 0;
class UserTask1660003133168 {
    constructor() {
        this.name = 'UserTask1660003133168';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
            yield queryRunner.query(`CREATE TABLE \`tasks\` (\`id\` int NOT NULL AUTO_INCREMENT, \`task\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_19bbb92c7d8cfded654386656b\` (\`task\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
            yield queryRunner.query(`CREATE TABLE \`tasks_email_user\` (\`tasksId\` int NOT NULL, \`userId\` int NOT NULL, INDEX \`IDX_21634fd5fb0b8ac84df9f92f58\` (\`tasksId\`), INDEX \`IDX_3d59c99271747ffc6da306abba\` (\`userId\`), PRIMARY KEY (\`tasksId\`, \`userId\`)) ENGINE=InnoDB`);
            yield queryRunner.query(`ALTER TABLE \`tasks_email_user\` ADD CONSTRAINT \`FK_21634fd5fb0b8ac84df9f92f58d\` FOREIGN KEY (\`tasksId\`) REFERENCES \`tasks\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
            yield queryRunner.query(`ALTER TABLE \`tasks_email_user\` ADD CONSTRAINT \`FK_3d59c99271747ffc6da306abba0\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE \`tasks_email_user\` DROP FOREIGN KEY \`FK_3d59c99271747ffc6da306abba0\``);
            yield queryRunner.query(`ALTER TABLE \`tasks_email_user\` DROP FOREIGN KEY \`FK_21634fd5fb0b8ac84df9f92f58d\``);
            yield queryRunner.query(`DROP INDEX \`IDX_3d59c99271747ffc6da306abba\` ON \`tasks_email_user\``);
            yield queryRunner.query(`DROP INDEX \`IDX_21634fd5fb0b8ac84df9f92f58\` ON \`tasks_email_user\``);
            yield queryRunner.query(`DROP TABLE \`tasks_email_user\``);
            yield queryRunner.query(`DROP INDEX \`IDX_19bbb92c7d8cfded654386656b\` ON \`tasks\``);
            yield queryRunner.query(`DROP TABLE \`tasks\``);
            yield queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
            yield queryRunner.query(`DROP TABLE \`user\``);
        });
    }
}
exports.UserTask1660003133168 = UserTask1660003133168;
