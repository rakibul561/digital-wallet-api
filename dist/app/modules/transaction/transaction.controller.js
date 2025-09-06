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
exports.TransactionController = exports.getAllAgentTransactions = void 0;
const catchAysnc_1 = require("../../../utils/catchAysnc");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const sendRespone_1 = require("../../../utils/sendRespone");
const transaction_service_1 = require("./transaction.service");
const addMoney = (0, catchAysnc_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    const amount = req.body.amount;
    const result = yield transaction_service_1.TransactionService.addMoneyDB(userId, amount);
    (0, sendRespone_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "Money added successfully",
        data: result,
    });
}));
const withdraw = (0, catchAysnc_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    const amount = req.body.amount;
    console.log("REQ BODY ===>", req.body);
    const result = yield transaction_service_1.TransactionService.withdrawDB(userId, amount);
    (0, sendRespone_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: " withdraw money successfully",
        data: result,
    });
}));
const sendMoney = (0, catchAysnc_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    const { receiverId, amount } = req.body;
    const result = yield transaction_service_1.TransactionService.sendMoneyDB(userId, receiverId, amount);
    (0, sendRespone_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: " send  money successfully",
        data: result,
    });
}));
const cashIn = (0, catchAysnc_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const agentId = req.user.agentId;
    const { amount, userId } = req.body;
    const result = yield transaction_service_1.TransactionService.cashInDB(agentId, userId, amount);
    (0, sendRespone_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: " cash in successfully",
        data: result,
    });
}));
const cashOut = (0, catchAysnc_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const agentId = req.user.agentId;
    const { amount, userId } = req.body;
    const result = yield transaction_service_1.TransactionService.cashOutDB(agentId, userId, amount);
    (0, sendRespone_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: " cash out  successfully",
        data: result,
    });
}));
const getMyTransaction = (0, catchAysnc_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || "-createdAt";
    const result = yield transaction_service_1.TransactionService.getMyTransactionsDb(userId, page, limit, sort);
    (0, sendRespone_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Your transactions fetched successfully",
        data: result,
    });
}));
exports.getAllAgentTransactions = (0, catchAysnc_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    const result = yield transaction_service_1.TransactionService.getAgentTransactionsDb(userId);
    (0, sendRespone_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Your transactions fetched successfully",
        data: result,
    });
}));
const getAllTransaction = (0, catchAysnc_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    const result = yield transaction_service_1.TransactionService.getAllTransactionDB(userId);
    (0, sendRespone_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "All transactions fetched successfully",
        data: result,
    });
}));
exports.TransactionController = {
    addMoney,
    withdraw,
    sendMoney,
    cashIn,
    cashOut,
    getMyTransaction,
    getAllTransaction,
    getAllAgentTransactions: exports.getAllAgentTransactions
};
