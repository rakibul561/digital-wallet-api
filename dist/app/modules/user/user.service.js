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
exports.UserService = void 0;
const wallet_model_1 = require("../wallet/wallet.model");
const user_model_1 = require("./user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUserDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    payload.password = yield bcrypt_1.default.hash(payload.password, 10);
    const user = yield user_model_1.User.create(payload);
    // wallet create
    const wallet = yield wallet_model_1.Wallet.create({
        userId: user._id,
        balance: 50,
        status: "ACTIVE",
    });
    // return user + walletId
    return Object.assign(Object.assign({}, user.toObject()), { walletId: wallet._id });
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.find({});
    const totalUsers = yield user_model_1.User.countDocuments();
    return {
        meta: {
            total: totalUsers
        },
        data: users,
    };
});
const SingleUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId).select("-password").lean();
    const wallet = yield wallet_model_1.Wallet.findOne({ userId });
    return Object.assign(Object.assign({}, user), { walletId: wallet === null || wallet === void 0 ? void 0 : wallet._id });
});
const userUpdateProfile = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phone, oldPassword, newPassword } = payload;
    const user = yield user_model_1.User.findById(userId);
    if (!user) {
        throw new Error("user not found");
    }
    if (name)
        user.name = name;
    if (phone)
        user.phone = phone;
    if (oldPassword && newPassword) {
        const isMatch = yield bcrypt_1.default.compare(oldPassword, user.password);
        if (!isMatch) {
            throw new Error("old password is Incorect");
        }
        user.password = yield bcrypt_1.default.hash(newPassword, 10);
    }
    yield user.save();
    return user;
});
const updateUserStatus = (userId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    user.status = status;
    yield user.save();
    return user;
});
exports.UserService = {
    createUserDb,
    getAllUsers,
    SingleUser,
    updateUserStatus,
    userUpdateProfile,
};
