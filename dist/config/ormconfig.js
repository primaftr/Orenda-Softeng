"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
const url = "mysql://root@localhost:3306/orenda_softeng";
exports.dataSource = new typeorm_1.DataSource({
    type: "mysql",
    url,
    logging: true,
    // synchronize: true,
    migrations: ["dist/migrations/*.js"],
    entities: ["dist/entity/*.js"],
});
