import { Request, Response } from "express"
import { catchAsync } from "../../../utils/catchAysnc"
import  httpStatus  from 'http-status-codes';
import { sendResponse } from "../../../utils/sendRespone";
import { TransactionService } from "./transaction.service";

 


 const addMoney = catchAsync(async (req:Request, res:Response) =>{
  
    console.log("the user is ", (req as any).user)

   const userId = (req as any).user.userId;
   const amount = req.body.amount;


   const result = await TransactionService.addMoneyDB(userId, amount)
     sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Money added successfully",
      data: result,
    });

 })


 const withdraw = () =>{

 }
 const sendMoney = () =>{

 }

 const cashIn = () =>{

 }

 const cashOut = () =>{

 }

 const getMyTransaction = () =>{

 }
 const getAllTransaction = () =>{

 }
 export const TransactionController = {
    addMoney,
    withdraw,
    sendMoney,
    cashIn,
    cashOut,
    getMyTransaction,
    getAllTransaction
 }