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
exports.UserService = void 0;
const wallet_model_1 = require("../wallet/wallet.model");
const user_model_1 = require("./user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUserDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    payload.password = yield bcrypt_1.default.hash(payload.password, 10);
    const user = yield user_model_1.User.create(payload);
    yield wallet_model_1.Wallet.create({
        userId: user._id,
        balance: 50,
    });
    return user;
});
// get all user 
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.find({});
    const totalUsers = yield user_model_1.User.countDocuments();
    return {
        meta: {
            total: totalUsers
        },
        data: users,
    };
});
exports.UserService = {
    createUserDb,
    getAllUsers
};
