import { Types } from "mongoose";

export enum TransactionType {
  ADD_MONEY = "ADD_MONEY",
  WITHDRAW = "WITHDRAW",
  SEND_MONEY = "SEND_MONEY",
  CASH_IN = "CASH_IN",
  CASH_OUT = "CASH_OUT",
}

export interface ITransaction {
  type: TransactionType;
  amount: number;
  walletId: Types.ObjectId;
  userId?: Types.ObjectId;
  senderId?: Types.ObjectId;
  receiverId?: Types.ObjectId;
  agentId?: Types.ObjectId;
 
  
}