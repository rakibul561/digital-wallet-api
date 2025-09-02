import { Request, Response } from "express"
import { catchAsync } from "../../../utils/catchAysnc"
import  httpStatus  from 'http-status-codes';
import { sendResponse } from "../../../utils/sendRespone";
import { TransactionService } from "./transaction.service";

 


 const addMoney = catchAsync(async (req:Request, res:Response) =>{
  

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

  const withdraw = catchAsync(async (req:Request, res:Response) =>{
  

   const userId = (req as any).user.userId;
   const amount = req.body.amount;
   console.log("REQ BODY ===>", req.body);



   const result = await TransactionService.withdrawDB(userId, amount)
     sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: " withdraw money successfully",
      data: result,
    });

 })

  const sendMoney = catchAsync(async (req:Request, res:Response) =>{
  
     const userId = (req as any).user.userId;
    const { receiverId, amount } = req.body;

   const result = await TransactionService.sendMoneyDB(userId, receiverId, amount)

     sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: " send  money successfully",
      data: result,
    });

 })

 
 const cashIn = catchAsync(async (req:Request, res:Response) =>{
  

   const agentId = (req as any).user.agentId;
   const {amount, userId} = req.body;


   const result = await TransactionService.cashInDB(agentId,userId, amount)
     sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: " cash in successfully",
      data: result,
    });

 })

 const cashOut = catchAsync(async (req:Request, res:Response) =>{
  

   const agentId = (req as any).user.agentId;
   const {amount, userId} = req.body;


   const result = await TransactionService.cashOutDB(agentId,userId, amount)
     sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: " cash out  successfully",
      data: result,
    });

 })



  const getMyTransaction = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;

 
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const sort = (req.query.sort as string) || "-createdAt";

  
  const result = await TransactionService.getMyTransactionsDb(userId, page, limit, sort);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Your transactions fetched successfully",
    data: result,
  });
});



  const getAllTransaction = catchAsync(async(req:Request, res:Response) =>{
      const userId = (req as any).user.userId;
      
   const result = await TransactionService.getAllTransactionDB(userId);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All transactions fetched successfully",
      data: result,
    });

    
  })

  
 export const TransactionController = {
    addMoney,
    withdraw,
    sendMoney,
    cashIn,
    cashOut,
    getMyTransaction,
    getAllTransaction
 }