"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletRouters = void 0;
const express_1 = __importDefault(require("express"));
const wallet_controller_1 = require("./wallet.controller");
const checkAuth_1 = require("../../middleware/checkAuth");
const user_interface_1 = require("../user/user.interface");
const router = express_1.default.Router();
router.get('/', (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), wallet_controller_1.WalletController.getAllWallet);
router.get('/me/:walletId', wallet_controller_1.WalletController.getSingleWallet);
router.patch('/block/:walletId', (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), wallet_controller_1.WalletController.updateWallets);
exports.WalletRouters = router;
