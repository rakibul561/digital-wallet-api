import { Request, Response } from "express";
import { sendResponse } from "../../../utils/sendRespone";
import { IUser } from "../user/user.interface";
import { AuthServices } from "./auth.service";

 
 
 export const userLogin = async (req:Request,res:Response) =>{
     
    const user = await AuthServices.loginUser(req.body)

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "User Login Successfully",
        data: user,
    })

 }  

 export const AuthController = {
    userLogin,

 }