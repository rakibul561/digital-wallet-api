"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const wallet_route_1 = require("../modules/wallet/wallet.route");
const transaction_route_1 = require("../modules/transaction/transaction.route");
exports.router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/user",
        route: user_route_1.UserRouters
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRouters
    },
    {
        path: "/wallets",
        route: wallet_route_1.WalletRouters
    },
    {
        path: "/transactions",
        route: transaction_route_1.TransactionRouters
    },
];
moduleRoutes.forEach((route) => {
    exports.router.use(route.path, route.route);
});
