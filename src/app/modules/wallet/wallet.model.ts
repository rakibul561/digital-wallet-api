import mongoose, { Schema, Document } from "mongoose";
import { IWallet, WalletStatus } from "./wallet.interface"; 



const walletSchema = new Schema<IWallet>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", 
      required: true,
      unique: true, 
    },
    balance: {
      type: Number,
      default: 50, 
      min: [0, "Balance cannot be negative"],
    },
    status: {
      type: String,
      enum: Object.values(WalletStatus),
      default: WalletStatus.ACTIVE,
    },
  },
  { timestamps: true }
);

export const Wallet = mongoose.model<IWallet>("Wallet", walletSchema);
