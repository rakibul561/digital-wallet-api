import { create } from "domain";
import { Request, Response } from "express";
import { User } from "./user.model";
import { UserService } from "./user.service";
import { sendResponse } from "../../../utils/sendRespone";
import { catchAsync } from "../../../utils/catchAysnc";


 

 const createUser = async (req:Request,res:Response) =>{
     
    const user = await UserService.createUserDb(req.body)

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "User Created Successfully",
        data: user,
    })

 }  


 const getAllUsers = catchAsync(async (req:Request,res:Response) =>{
   const result = await UserService.getAllUsers();


    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "  All Users Successfully",
        data: result,
    })


 })

 const getSingleUsers = catchAsync(async (req:Request,res:Response) =>{
   const result = await UserService.SingleUser();


    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "  Singlet Users Successfully",
        data: result,
    })


 })



 export const UserController = {
    createUser,
    getAllUsers,
    getSingleUsers
 }