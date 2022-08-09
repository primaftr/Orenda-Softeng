"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const ormconfig_1 = require("./config/ormconfig");
const assignRoutes_1 = require("./routes/assignRoutes");
const commonRoutes_1 = require("./routes/commonRoutes");
const registerRoutes_1 = require("./routes/registerRoutes");
const unassignRoutes_1 = require("./routes/unassignRoutes");
ormconfig_1.dataSource
    .initialize()
    .then(() => {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({ origin: "http://localhost:8000" }));
    app.use(function (req, res, next) {
        res.set("content-type", "application/json");
        next();
    });
    app.use(express_1.default.json());
    app.use(assignRoutes_1.assignRoutes);
    app.use(commonRoutes_1.commonRoutes);
    app.use(registerRoutes_1.registerRoutes);
    app.use(unassignRoutes_1.unassignRoutes);
    console.log("Listening on port 3000");
    app.listen(3000);
})
    .catch((err) => console.error(err));
