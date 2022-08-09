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
exports.assignRoutes = void 0;
const express_1 = __importDefault(require("express"));
const ormconfig_1 = require("../config/ormconfig");
const Tasks_1 = require("../entity/Tasks");
const User_1 = require("../entity/User");
const errorHandling_1 = __importDefault(require("../utils/errorHandling"));
const validate_1 = require("../utils/validate");
const taskRepository = ormconfig_1.dataSource.getRepository(Tasks_1.Tasks);
const userRepository = ormconfig_1.dataSource.getRepository(User_1.User);
const router = express_1.default.Router();
exports.assignRoutes = router;
router.post("/api/assign", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user: userReq, task: taskReq } = req.body;
    const { errorMessage } = (0, validate_1.validateEmail)(userReq);
    if (errorMessage) {
        return res.status(400).send(errorMessage);
    }
    const users = yield userRepository.find({ where: { email: userReq } });
    if (users.length == 0) {
        return res.status(400).send("Email not found!");
    }
    for (let task of taskReq) {
        if (typeof task !== "string") {
            return res.status(400).send("Invalid task!");
        }
        const tasks = yield taskRepository.find({ where: { task } });
        if (tasks.length !== 0) {
            try {
                yield ormconfig_1.dataSource
                    .createQueryBuilder()
                    .relation(Tasks_1.Tasks, "email")
                    .of(tasks)
                    .add(users);
            }
            catch (err) {
                const { status, message } = (0, errorHandling_1.default)(err, "Task");
                return res.status(status).send(message);
            }
        }
        else {
            try {
                const newTask = new Tasks_1.Tasks();
                newTask.task = task;
                newTask.email = users;
                yield ormconfig_1.dataSource.manager.save(newTask);
            }
            catch (err) {
                const { status, message } = (0, errorHandling_1.default)(err, "Task");
                return res.status(status).send(message);
            }
        }
        return res.status(204).send();
    }
}));
