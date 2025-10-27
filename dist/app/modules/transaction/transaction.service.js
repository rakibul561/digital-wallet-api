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
exports.TransactionService = exports.getAgentTransactionsDb = exports.getMyTransactionsDb = void 0;
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const wallet_model_1 = require("../wallet/wallet.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const transaction_model_1 = require("./transaction.model");
const transaction_interface_1 = require("./transaction.interface");
const addMoneyDB = (userId, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const wallet = yield wallet_model_1.Wallet.findOne({ userId });
    if (!wallet) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Wallet not Found");
    }
    if ((wallet === null || wallet === void 0 ? void 0 : wallet.status) === "BLOCKED") {
        throw new Error("Wallet is blocked. Cannot add money.");
    }
    wallet.balance = Number(wallet.balance) + Number(amount);
    yield wallet.save();
    yield transaction_model_1.Transaction.create({
        type: transaction_interface_1.TransactionType.ADD_MONEY,
        amount,
        walletId: wallet._id,
        senderId: userId,
    });
    return wallet;
});
const withdrawDB = (userId, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const wallet = yield wallet_model_1.Wallet.findOne({ userId });
    if (!wallet) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Wallet not Found");
    }
    if ((wallet === null || wallet === void 0 ? void 0 : wallet.status) === "BLOCKED") {
        throw new Error("Wallet is blocked. Cannot withdraw money.");
    }
    if (wallet.balance < amount) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Insufficient balance");
    }
    wallet.balance = Number(wallet.balance) - Number(amount);
    yield wallet.save();
    yield transaction_model_1.Transaction.create({
        type: transaction_interface_1.TransactionType.WITHDRAW,
        amount,
        walletId: wallet._id,
        userId,
    });
    return wallet;
});
const sendMoneyDB = (senderId, receiverId, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const senderWallet = yield wallet_model_1.Wallet.findOne({ userId: senderId });
    const receiverWallet = yield wallet_model_1.Wallet.findOne({ userId: receiverId });
    if (!senderWallet || !receiverWallet)
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Sender or receiver wallet not found");
    if ((senderWallet === null || senderWallet === void 0 ? void 0 : senderWallet.status) === "BLOCKED" || (receiverWallet === null || receiverWallet === void 0 ? void 0 : receiverWallet.status) === "BLOCKED") {
        throw new Error("Wallet is blocked. Cannot send money.");
    }
    if (senderWallet.balance < amount)
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Insufficient balance");
    senderWallet.balance = Number(senderWallet.balance) - Number(amount);
    receiverWallet.balance = Number(receiverWallet.balance) + Number(amount);
    yield senderWallet.save();
    yield receiverWallet.save();
    yield transaction_model_1.Transaction.create({
        type: transaction_interface_1.TransactionType.SEND_MONEY,
        amount,
        walletId: senderWallet._id,
        senderId,
        receiverId,
    });
    return receiverWallet;
});
const cashInDB = (agentId, userId, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const userWallet = yield wallet_model_1.Wallet.findOne({ userId });
    if (!userWallet) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User Wallet not Found");
    }
    if ((userWallet === null || userWallet === void 0 ? void 0 : userWallet.status) === "BLOCKED") {
        throw new Error("Wallet is blocked. Cannot add money.");
    }
    if (userWallet.balance < amount) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Insufficient balance");
    }
    userWallet.balance = Number(userWallet.balance) + Number(amount);
    yield userWallet.save();
    yield transaction_model_1.Transaction.create({
        type: transaction_interface_1.TransactionType.CASH_IN,
        amount,
        walletId: userWallet._id,
        agentId,
        userId,
    });
    return userWallet;
});
const cashOutDB = (agentId, userId, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const userWallet = yield wallet_model_1.Wallet.findOne({ userId });
    if (!userWallet) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User Wallet not Found");
    }
    if ((userWallet === null || userWallet === void 0 ? void 0 : userWallet.status) === "BLOCKED") {
        throw new Error("Wallet is blocked. Cannot add money.");
    }
    userWallet.balance = Number(userWallet.balance) - Number(amount);
    yield userWallet.save();
    yield transaction_model_1.Transaction.create({
        type: transaction_interface_1.TransactionType.CASH_OUT,
        amount,
        walletId: userWallet._id,
        agentId,
        userId,
    });
    return userWallet;
});
const getMyTransactionsDb = (userId, page, limit, sort) => __awaiter(void 0, void 0, void 0, function* () {
    const skip = (page - 1) * limit;
    const query = {
        $or: [{ userId }, { senderId: userId }, { receiverId: userId }],
    };
    const allTransaction = yield transaction_model_1.Transaction.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit);
    const total = yield transaction_model_1.Transaction.countDocuments(query);
    return {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        data: allTransaction,
    };
});
exports.getMyTransactionsDb = getMyTransactionsDb;
const getAgentTransactionsDb = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const transactions = yield transaction_model_1.Transaction.find({ userId })
        .sort({ createdAt: -1 }); // latest first
    return transactions;
});
exports.getAgentTransactionsDb = getAgentTransactionsDb;
const getAllTransactionDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const allTransaction = yield transaction_model_1.Transaction.find().populate("userId senderId receiverId agentId walletId");
    return allTransaction;
});
exports.TransactionService = {
    addMoneyDB,
    withdrawDB,
    sendMoneyDB,
    cashInDB,
    cashOutDB,
    getMyTransactionsDb: exports.getMyTransactionsDb,
    getAllTransactionDB,
    getAgentTransactionsDb: exports.getAgentTransactionsDb
};
