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
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_service_1.AuthServices.loginUser(req.body);
    (0, sendRespone_1.sendResponse)(res, {
        success: true,
        statusCode: 201,
        message: "User Login Successfully",
        data: user,
    });
});
exports.userLogin = userLogin;
exports.AuthController = {
    userLogin: exports.userLogin,
};
