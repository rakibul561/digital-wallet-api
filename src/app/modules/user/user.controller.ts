import { create } from "domain";
import { Request, Response } from "express";
import { User } from "./user.model";
import { UserService } from "./user.service";
import { sendResponse } from "../../../utils/sendRespone";


 

 export const createUser = async (req:Request,res:Response) =>{
     
    const user = await UserService.createUserDb(req.body)

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "User Created Successfully",
        data: user,
    })

 } 


 export const UserController = {
    createUser
 }