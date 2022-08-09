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
exports.commonRoutes = void 0;
const express_1 = __importDefault(require("express"));
const ormconfig_1 = require("../config/ormconfig");
const Tasks_1 = require("../entity/Tasks");
const User_1 = require("../entity/User");
const validate_1 = require("../utils/validate");
const router = express_1.default.Router();
exports.commonRoutes = router;
const taskRepository = ormconfig_1.dataSource.getRepository(Tasks_1.Tasks);
const userRepository = ormconfig_1.dataSource.getRepository(User_1.User);
router.get("/api/task/common", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { user: userReq } = req.body;
    let error;
    if (userReq.length !== 2) {
        return res.status(400).send("Max input email is 2!");
    }
    for (let i in userReq) {
        const email = userReq[i];
        const { errorMessage } = (0, validate_1.validateEmail)(email);
        errorMessage !== null ? (error = errorMessage) : null;
        const findUser = yield userRepository.find({
            where: { email },
        });
        if (findUser.length == 0) {
            return res.status(400).send("Email not found!");
        }
    }
    if (error) {
        return res.status(400).send(error);
    }
    try {
        const common = yield taskRepository
            .createQueryBuilder("task")
            .leftJoinAndSelect("task.email", "email")
            .where("email IN (:...email)", { email: userReq })
            .getMany();
        console.log(common);
        let tasks = [];
        for (let filterCommon of common) {
            if (((_a = filterCommon.email) === null || _a === void 0 ? void 0 : _a.length) == userReq.length) {
                tasks.push(filterCommon.task);
            }
        }
        if (!tasks) {
            return res.status(400).send("No common task found!");
        }
        return res.status(200).send({ tasks });
    }
    catch (error) {
        return res.status(400).send(error);
    }
}));
