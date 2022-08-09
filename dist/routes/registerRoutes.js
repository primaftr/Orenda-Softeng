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
exports.registerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const ormconfig_1 = require("../config/ormconfig");
const User_1 = require("../entity/User");
const validate_1 = require("../utils/validate");
const router = express_1.default.Router();
exports.registerRoutes = router;
router.post("/api/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Users } = req.body;
    const normalizedEmail = Users.map((email) => ({ email }));
    let error;
    for (let i in normalizedEmail) {
        const { errorMessage } = (0, validate_1.validateEmail)(normalizedEmail[i].email);
        errorMessage !== null ? (error = errorMessage) : null;
    }
    try {
        if (error) {
            throw new Error(error);
        }
        yield ormconfig_1.dataSource
            .createQueryBuilder()
            .insert()
            .into(User_1.User)
            .values(normalizedEmail)
            .execute();
    }
    catch (err) {
        console.log(err);
        if (err.errno == "1062") {
            return res.status(409).send("Email already exist!");
        }
        else {
            console.log(err);
            return res.status(400).send(error);
        }
    }
    return res.status(204).send();
}));
