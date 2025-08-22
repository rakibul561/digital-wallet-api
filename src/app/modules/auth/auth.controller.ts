import { Request, Response } from "express";
import { sendResponse } from "../../../utils/sendRespone";
import { IUser } from "../user/user.interface";
import { AuthServices } from "./auth.service";

 
 
 export const userLogin = async (req:Request,res:Response) =>{
     
    const data = await AuthServices.loginUser(req.body)

   res.cookie("accessToken", data.accessToken, {
     secure: true,
     httpOnly: true,
     sameSite: "lax",
  });


  res.cookie('refreshToken', data.refreshToken, {
    secure:true,
    httpOnly: true,
  });




    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "User Login Successfully",
        data,
    })

 }  

 export const AuthController = {
    userLogin,

 }