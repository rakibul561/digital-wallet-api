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
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const sendRespone_1 = require("../../../utils/sendRespone");
const catchAysnc_1 = require("../../../utils/catchAysnc");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_service_1.UserService.createUserDb(req.body);
    (0, sendRespone_1.sendResponse)(res, {
        success: true,
        statusCode: 201,
        message: "User Created Successfully",
        data: user,
    });
});
const getAllUsers = (0, catchAysnc_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserService.getAllUsers();
    (0, sendRespone_1.sendResponse)(res, {
        success: true,
        statusCode: 201,
        message: "  All Users Successfully",
        data: result,
    });
}));
exports.UserController = {
    createUser,
    getAllUsers
};
