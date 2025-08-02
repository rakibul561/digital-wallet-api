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
exports.WalletServices = exports.walletUpdated = exports.createWalletDB = void 0;
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const user_interface_1 = require("../user/user.interface");
const wallet_model_1 = require("./wallet.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const createWalletDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const { userId, balance } = payload;
    const data = yield wallet_model_1.Wallet.create({
        userId,
        balance,
    });
    return data;
});
exports.createWalletDB = createWalletDB;
const getAllWalletsDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const wallets = yield wallet_model_1.Wallet.find({});
    return wallets;
});
const getSingleWalletsDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield wallet_model_1.Wallet.findById(payload);
    return data;
});
const walletUpdated = (walletId, payload, userToken) => __awaiter(void 0, void 0, void 0, function* () {
    const existingWallet = yield wallet_model_1.Wallet.findById(walletId);
    if (!existingWallet) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Wallet not found");
    }
    if (payload.status) {
        if (userToken.role !== user_interface_1.Role.ADMIN) {
            throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "Only admins can change wallet status");
        }
    }
    const updatedWallet = yield wallet_model_1.Wallet.findByIdAndUpdate(walletId, payload, {
        new: true,
        runValidators: true,
    });
    return updatedWallet;
});
exports.walletUpdated = walletUpdated;
exports.WalletServices = {
    createWalletDB: exports.createWalletDB,
    getAllWalletsDB,
    getSingleWalletsDB,
    walletUpdated: exports.walletUpdated,
};
