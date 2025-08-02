"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionRouters = void 0;
const express_1 = __importDefault(require("express"));
const transaction_controller_1 = require("./transaction.controller");
const checkAuth_1 = require("../../middleware/checkAuth");
const user_interface_1 = require("../user/user.interface");
const router = express_1.default.Router();
router.post("/add-money", (0, checkAuth_1.checkAuth)(user_interface_1.Role.USER), transaction_controller_1.TransactionController.addMoney);
router.post("/withdraw", (0, checkAuth_1.checkAuth)(user_interface_1.Role.USER), transaction_controller_1.TransactionController.withdraw);
router.post("/send-money", (0, checkAuth_1.checkAuth)(user_interface_1.Role.USER), transaction_controller_1.TransactionController.sendMoney);
router.post("/cash-in", (0, checkAuth_1.checkAuth)(user_interface_1.Role.AGENT), transaction_controller_1.TransactionController.cashIn);
router.post("/cash-out", (0, checkAuth_1.checkAuth)(user_interface_1.Role.AGENT), transaction_controller_1.TransactionController.cashOut);
router.get("/me", (0, checkAuth_1.checkAuth)(user_interface_1.Role.USER, user_interface_1.Role.AGENT), transaction_controller_1.TransactionController.getMyTransaction);
router.get("/", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), transaction_controller_1.TransactionController.getAllTransaction);
exports.TransactionRouters = router;
