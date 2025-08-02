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
exports.AuthServices = exports.loginUser = void 0;
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const user_model_1 = require("../user/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const env_1 = require("../../../config/env");
const jwt_1 = require("../../../utils/jwt");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.User.findOne({ email: payload.email });
    if (!isUserExist) {
        throw new AppError_1.default(404, "User Not Found");
    }
    const checkPassword = yield bcrypt_1.default.compare(payload.password, isUserExist.password);
    if (!checkPassword) {
        throw new AppError_1.default(403, "Password Does not exist");
    }
    const jwtPayload = {
        userId: isUserExist._id,
        email: payload.email,
        role: isUserExist.role
    };
    const accessToken = (0, jwt_1.generateToken)(jwtPayload, env_1.envVars.JWT_ACCESS_SECRET, env_1.envVars.JWT_ACCESS_EXPIRES);
    return accessToken;
});
exports.loginUser = loginUser;
exports.AuthServices = {
    loginUser: exports.loginUser,
};
