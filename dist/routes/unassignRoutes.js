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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unassignRoutes = void 0;
const express_1 = __importDefault(require("express"));
const ormconfig_1 = require("../config/ormconfig");
const Tasks_1 = require("../entity/Tasks");
const User_1 = require("../entity/User");
const validate_1 = require("../utils/validate");
const taskRepository = ormconfig_1.dataSource.getRepository(Tasks_1.Tasks);
const userRepository = ormconfig_1.dataSource.getRepository(User_1.User);
const router = express_1.default.Router();
exports.unassignRoutes = router;
router.delete("/api/unassign", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user: userReq, task: taskReq } = req.body;
    const { errorMessage } = (0, validate_1.validateEmail)(userReq);
    if (errorMessage) {
        return res.status(400).send(errorMessage);
    }
    const findUser = yield userRepository.find({ where: { email: userReq } });
    console.log(findUser);
    if (findUser.length == 0) {
        return res.status(400).send("Email not found!");
    }
    for (let task of taskReq) {
        if (typeof task !== "string") {
            return res.status(400).send("Invalid task!");
        }
    }
    const result = yield ormconfig_1.dataSource
        .createQueryBuilder()
        .delete()
        .from(Tasks_1.Tasks)
        .where("task IN(:...task)", { task: taskReq })
        .execute();
    if (result.affected == 0) {
        return res.status(400).send("Task not found!");
    }
    return res.status(204).send();
}));
