import { create } from "domain";
import { Request, Response } from "express";
import { User } from "./user.model";
import { UserService } from "./user.service";
import { sendResponse } from "../../../utils/sendRespone";
import { catchAsync } from "../../../utils/catchAysnc";
import { JwtPayload } from "jsonwebtoken";


 

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

// Controller
const getSingleUsers = catchAsync(async (req: Request, res: Response) => {
  const decodedToken = req.user;
  const result = await UserService.SingleUser(decodedToken.userId);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Single User Successfully",
    data: result,
  });
});


const userUpdateProfile = catchAsync(async(req: Request, res: Response) =>{
   const decodedToken = req.user!;
   const payload = req.body;

   const result = await UserService.userUpdateProfile(decodedToken.userId, payload)
  
     sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "User status updated successfully",
    data:result
  });
})



const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { status } = req.body; 
  const result = await UserService.updateUserStatus(userId, status);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "User status updated successfully",
    data: result,
  });
});




 export const UserController = {
    createUser,
    getAllUsers,
    getSingleUsers,
    updateUserStatus,
    userUpdateProfile
 }