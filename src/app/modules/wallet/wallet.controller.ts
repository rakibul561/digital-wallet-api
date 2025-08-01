import { Request, Response } from "express"
import { WalletServices } from "./wallet.service"
import { sendResponse } from "../../../utils/sendRespone"
import { catchAsync } from "../../../utils/catchAysnc"

 


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


  


export const WalletController = {
    createWallet,
    getAllWallet,
    getSingleWallet
}