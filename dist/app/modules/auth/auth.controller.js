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
exports.AuthController = exports.userLogin = void 0;
const sendRespone_1 = require("../../../utils/sendRespone");
const auth_service_1 = require("./auth.service");
const catchAysnc_1 = require("../../../utils/catchAysnc");
const wallet_model_1 = require("../wallet/wallet.model");
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = yield auth_service_1.AuthServices.loginUser(req.body);
    const userId = ((_a = data === null || data === void 0 ? void 0 : data.user) === null || _a === void 0 ? void 0 : _a._id) || (data === null || data === void 0 ? void 0 : data._id);
    console.log(userId);
    const wallet = yield wallet_model_1.Wallet.findOne({ userId });
    res.cookie("accessToken", data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // local:false, prod:true
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    res.cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    (0, sendRespone_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "User Login Successfully",
        data: Object.assign(Object.assign({}, data), { walletId: wallet === null || wallet === void 0 ? void 0 : wallet._id }),
    });
});
exports.userLogin = userLogin;
const logout = (0, catchAysnc_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    });
    (0, sendRespone_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "User Logged Out Successfully",
        data: null,
    });
}));
exports.AuthController = {
    userLogin: exports.userLogin,
    logout,
};
