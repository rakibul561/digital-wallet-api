import AppError from "../../errorHelpers/AppError"
import { Wallet } from "../wallet/wallet.model"
import httpStatus from 'http-status-codes'
import { Transaction } from "./transaction.model"
import { TransactionType } from "./transaction.interface"
 

const addMoneyDB = async (userId: string, amount: number) => {
  // Add debugging to see what we're searching for
  console.log("Searching for wallet with userId:", userId);
  console.log("Amount to add:", amount);
  
  const wallet = await Wallet.findOne({ userId });
  console.log("Found wallet:", wallet);
  
  if (!wallet) {
    throw new AppError(httpStatus.NOT_FOUND, "Wallet not Found");
  }

   wallet.balance = Number(wallet.balance) + Number(amount);
  
  // IMPORTANT: Save the updated wallet to database
  await wallet.save();

  // Create transaction record
  await Transaction.create({
    type: TransactionType.ADD_MONEY,
    amount,
    walletId: wallet._id,
    userId
  });

  console.log("Updated wallet balance:", wallet.balance);
  return wallet;
}







 const withdrawDB = () =>{

 } 
 const sendMoneyDB = () =>{

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


