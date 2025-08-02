import AppError from "../../errorHelpers/AppError";
import { Wallet } from "../wallet/wallet.model";
import httpStatus from "http-status-codes";
import { Transaction } from "./transaction.model";
import { TransactionType } from "./transaction.interface";

const addMoneyDB = async (userId: string, amount: number) => {
  const wallet = await Wallet.findOne({ userId });

  if (!wallet) {
    throw new AppError(httpStatus.NOT_FOUND, "Wallet not Found");
  }
  if (wallet?.status === "BLOCKED") {
    throw new Error("Wallet is blocked. Cannot add money.");
  }

  wallet.balance = Number(wallet.balance) + Number(amount);

  await wallet.save();

  await Transaction.create({
    type: TransactionType.ADD_MONEY,
    amount,
    walletId: wallet._id,
    senderId: userId,
  });

  return wallet;
};
const withdrawDB = async (userId: string, amount: number) => {
  const wallet = await Wallet.findOne({ userId });

  if (!wallet) {
    throw new AppError(httpStatus.NOT_FOUND, "Wallet not Found");
  }
  if (wallet?.status === "BLOCKED") {
    throw new Error("Wallet is blocked. Cannot withdraw money.");
  }

  if (wallet.balance < amount) {
    throw new AppError(httpStatus.BAD_REQUEST, "Insufficient balance");
  }

  wallet.balance = Number(wallet.balance) - Number(amount);

  await wallet.save();

  await Transaction.create({
    type: TransactionType.WITHDRAW,
    amount,
    walletId: wallet._id,
    userId,
  });

  return wallet;
};

const sendMoneyDB = async (
  senderId: string,
  receiverId: string,
  amount: number
) => {
  const senderWallet = await Wallet.findOne({ userId: senderId });
  const receiverWallet = await Wallet.findOne({ userId: receiverId });


  

  if (!senderWallet || !receiverWallet)
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Sender or receiver wallet not found"
    );


    if (senderWallet?.status === "BLOCKED" || receiverWallet?.status === "BLOCKED") {
    throw new Error("Wallet is blocked. Cannot send money.");
  }


  if (senderWallet.balance < amount)
    throw new AppError(httpStatus.BAD_REQUEST, "Insufficient balance");

  senderWallet.balance = Number(senderWallet.balance) - Number(amount);
  receiverWallet.balance = Number(receiverWallet.balance) + Number(amount);

  await senderWallet.save();
  await receiverWallet.save();

  await Transaction.create({
    type: TransactionType.SEND_MONEY,
    amount,
    walletId: senderWallet._id,
    senderId,
    receiverId,
  });

  return receiverWallet;
};

const cashInDB = async (agentId: string, userId: string, amount: number) => {
  const userWallet = await Wallet.findOne({ userId });
  if (!userWallet) {
    throw new AppError(httpStatus.NOT_FOUND, "User Wallet not Found");
  }
   
 if (userWallet?.status === "BLOCKED") {
    throw new Error("Wallet is blocked. Cannot add money.");
  }

  if (userWallet.balance < amount) {
    throw new AppError(httpStatus.BAD_REQUEST, "Insufficient balance");
  }

  userWallet.balance = Number(userWallet.balance) + Number(amount);

  await userWallet.save();

  await Transaction.create({
    type: TransactionType.CASH_IN,
    amount,
    walletId: userWallet._id,
    agentId,
    userId,
  });

  return userWallet;
};

const cashOutDB = async (agentId: string, userId: string, amount: number) => {
  const userWallet = await Wallet.findOne({ userId });
  if (!userWallet) {
    throw new AppError(httpStatus.NOT_FOUND, "User Wallet not Found");
  }
  
  if (userWallet?.status === "BLOCKED") {
    throw new Error("Wallet is blocked. Cannot add money.");
  }


  userWallet.balance = Number(userWallet.balance) - Number(amount);

  await userWallet.save();

  await Transaction.create({
    type: TransactionType.CASH_OUT,
    amount,
    walletId: userWallet._id,
    agentId,
    userId,
  });

  return userWallet;
};


export const getMyTransactionsDb = async (
  userId: string,
  page: number,
  limit: number,
  sort: string
) => {
  const skip = (page - 1) * limit;

  const query = {
    $or: [{ userId }, { senderId: userId }, { receiverId: userId }],
  };

  const allTransaction = await Transaction.find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit);

  const total = await Transaction.countDocuments(query);

  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    data: allTransaction,
  };
};



const getAllTransactionDB = async (userId: string) => {
  const allTransaction = await Transaction.find().populate(
    "userId senderId receiverId agentId walletId"
  );

  return allTransaction;
};

export const TransactionService = {
  addMoneyDB,
  withdrawDB,
  sendMoneyDB,
  cashInDB,
  cashOutDB,
  getMyTransactionsDb,
  getAllTransactionDB,
};
