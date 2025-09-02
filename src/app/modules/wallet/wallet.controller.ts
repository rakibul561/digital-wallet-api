import { Request, Response } from "express"
import { WalletServices, walletUpdated } from "./wallet.service"
import { sendResponse } from "../../../utils/sendRespone"
import { catchAsync } from "../../../utils/catchAysnc"
import { Wallet } from "./wallet.model"
import { JwtPayload } from "jsonwebtoken"
import httpStatus  from 'http-status-codes';

 


export const createWallet = async (req:Request, res:Response) =>{
 
    const wallet = await WalletServices.createWalletDB(req.body)
     sendResponse(res, {
            success: true,
            statusCode: 201,
            message: "User Created Successfully",
            data: wallet,
        })
  
}   

 export  const getAllWallet = catchAsync(async (req:Request,res:Response) =>{
   const result = await WalletServices.getAllWalletsDB();

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "  All Wallets Successfully",
        data: result,
    })


 })
 export  const getSingleWallet = catchAsync(async (req:Request,res:Response) =>{

     const walletId = req.params.walletId;
     const result = await WalletServices.getSingleWalletsDB(walletId)

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: " Single Wallet Recived succesfull",
        data: result,
    })


 }) 

export const updateWallets = catchAsync(async (req: Request, res: Response) => {
  const walletId = req.params.walletId;
  const verifiedToken = (req as any).user as JwtPayload;
  const payload = req.body;

  const updatedWallet = await walletUpdated(walletId, payload, verifiedToken);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Wallet updated successfully",
    data: updatedWallet,
  });
});

  


export const WalletController = {
    createWallet,
    getAllWallet,
    getSingleWallet,
    updateWallets
}