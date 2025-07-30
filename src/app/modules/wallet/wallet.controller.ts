import { Request, Response } from "express"
import { WalletServices } from "./wallet.service"
import { sendResponse } from "../../../utils/sendRespone"

 


export const createWallet = async (req:Request, res:Response) =>{
 
    const wallet = await WalletServices.createWalletDB(req.body)
     sendResponse(res, {
            success: true,
            statusCode: 201,
            message: "User Created Successfully",
            data: wallet,
        })
  
} 


export const WalletController = {
    createWallet
}