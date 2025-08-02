"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const mongoose_1 = require("mongoose");
const transaction_interface_1 = require("./transaction.interface");
const transactionSchema = new mongoose_1.Schema({
    type: {
        type: String,
        enum: Object.values(transaction_interface_1.TransactionType),
        required: true,
    },
    amount: { type: Number, required: true },
    walletId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Wallet", required: true },
    // Relations
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    senderId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    receiverId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    agentId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });
exports.Transaction = (0, mongoose_1.model)("Transaction", transactionSchema);
