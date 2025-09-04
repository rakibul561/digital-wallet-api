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
exports.checkAuth = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("../errorHelpers/AppError"));
const jwt_1 = require("../../utils/jwt");
const env_1 = require("../../config/env");
const user_model_1 = require("../modules/user/user.model");
const user_interface_1 = require("../modules/user/user.interface");
const checkAuth = (...authRoles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = req.headers.authorization;
        if (!accessToken) {
            throw new AppError_1.default(http_status_codes_1.default.UNAUTHORIZED, "No Token Received");
        }
        const token = accessToken.startsWith('Bearer ')
            ? accessToken.slice(7)
            : accessToken;
        const verifiedToken = (0, jwt_1.verifyToken)(token, env_1.envVars.JWT_ACCESS_SECRET);
     
        const isUserExist = yield user_model_1.User.findOne({ email: verifiedToken.email });
        if (!isUserExist) {
            throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User does not exist");
        }
        if (isUserExist.status === user_interface_1.Status.BLOCKED || isUserExist.status === user_interface_1.Status.INACTIVE) {
            throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, `User is ${isUserExist.status}`);
        }
        if (authRoles.length > 0 && !authRoles.includes(verifiedToken.role)) {
            throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "You are not permitted to access this route!");
        }
        req.user = verifiedToken;
        next();
    }
    catch (error) {
        console.log("JWT error:", error);
        next(error);
    }
});
exports.checkAuth = checkAuth;
