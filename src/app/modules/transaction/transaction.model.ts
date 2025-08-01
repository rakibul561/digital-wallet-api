import { model, Schema } from "mongoose";
import { ITransaction, TransactionType } from "./transaction.interface";

const transactionSchema = new Schema<ITransaction>(
  {
    type: {
      type: String,
      enum: Object.values(TransactionType),
      required: true,
    },
    amount: { type: Number, required: true },
    walletId: { type: Schema.Types.ObjectId, ref: "Wallet", required: true },

    // Relations
    userId: { type: Schema.Types.ObjectId, ref: "User" }, 
    senderId: { type: Schema.Types.ObjectId, ref: "User" }, 
    receiverId: { type: Schema.Types.ObjectId, ref: "User" }, 
    agentId: { type: Schema.Types.ObjectId, ref: "User" }, 
  },
  { timestamps: true }
);

export const Transaction = model<ITransaction>("Transaction", transactionSchema);