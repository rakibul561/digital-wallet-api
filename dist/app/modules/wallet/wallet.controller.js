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
exports.WalletController = exports.updateWallets = exports.getSingleWallet = exports.getAllWallet = exports.createWallet = void 0;
const wallet_service_1 = require("./wallet.service");
const sendRespone_1 = require("../../../utils/sendRespone");
const catchAysnc_1 = require("../../../utils/catchAysnc");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const createWallet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const wallet = yield wallet_service_1.WalletServices.createWalletDB(req.body);
    (0, sendRespone_1.sendResponse)(res, {
        success: true,
        statusCode: 201,
        message: "User Created Successfully",
        data: wallet,
    });
});
exports.createWallet = createWallet;
exports.getAllWallet = (0, catchAysnc_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield wallet_service_1.WalletServices.getAllWalletsDB();
    (0, sendRespone_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "  All Wallets Successfully",
        data: result,
    });
}));
exports.getSingleWallet = (0, catchAysnc_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const walletId = req.params.walletId;
    const result = yield wallet_service_1.WalletServices.getSingleWalletsDB(walletId);
    (0, sendRespone_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: " Single Wallet Recived succesfull",
        data: result,
    });
}));
exports.updateWallets = (0, catchAysnc_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const walletId = req.params.walletId;
    const verifiedToken = req.user;
    const payload = req.body;
    const updatedWallet = yield (0, wallet_service_1.walletUpdated)(walletId, payload, verifiedToken);
    (0, sendRespone_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Wallet updated successfully",
        data: updatedWallet,
    });
}));
exports.WalletController = {
    createWallet: exports.createWallet,
    getAllWallet: exports.getAllWallet,
    getSingleWallet: exports.getSingleWallet,
    updateWallets: exports.updateWallets
};
