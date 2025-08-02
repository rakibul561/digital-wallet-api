import AppError from "../../errorHelpers/AppError"
import { Wallet } from "../wallet/wallet.model"
import httpStatus from 'http-status-codes'
import { Transaction } from "./transaction.model"
import { TransactionType } from "./transaction.interface"
 

const addMoneyDB = async (userId: string, amount: number) => {

  const wallet = await Wallet.findOne({ userId });

  
  if (!wallet) {
    throw new AppError(httpStatus.NOT_FOUND, "Wallet not Found");
  }

   wallet.balance = Number(wallet.balance) + Number(amount);
  
  await wallet.save();

  
  await Transaction.create({
    type: TransactionType.ADD_MONEY,
    amount,
    walletId: wallet._id,
    userId
  });

  return wallet;
}
const withdrawDB = async (userId: string, amount: number) => {

  const wallet = await Wallet.findOne({ userId });

  
  if (!wallet) {
    throw new AppError(httpStatus.NOT_FOUND, "Wallet not Found");
  }

  if(wallet.balance < amount) {
    throw new AppError(httpStatus.BAD_REQUEST, "Insufficient balance")
  }

   wallet.balance = Number(wallet.balance) - Number(amount);
  
  await wallet.save();

  
  await Transaction.create({
    type: TransactionType.WITHDRAW,
    amount,
    walletId: wallet._id,
    userId
  });

  return wallet;
}

const sendMoneyDB = async (senderId: string,receiverId:string, amount: number) => {

 const senderWallet = await Wallet.findOne({ userId: senderId });
    const receiverWallet = await Wallet.findOne({ userId: receiverId });

    if (!senderWallet || !receiverWallet)
      throw new AppError(httpStatus.NOT_FOUND, "Sender or receiver wallet not found");
    if (senderWallet.balance < amount)
      throw new AppError(httpStatus.BAD_REQUEST, "Insufficient balance");

    senderWallet.balance = Number(senderWallet.balance) - Number(amount)
    receiverWallet.balance = Number(receiverWallet.balance) + Number(amount)
    

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
}







 const cashInDB = () =>{

 } 
 const cashOutDB = () =>{

 } 
 const getMyTransactionsDb = () =>{

 } 
 const getAllTransactionDB = () =>{

 } 
  






 export const TransactionService = {
   addMoneyDB,
   withdrawDB,
   sendMoneyDB,
   cashInDB,
   cashOutDB,
   getMyTransactionsDb,
   getAllTransactionDB
 }


