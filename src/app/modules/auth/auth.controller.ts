import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../../utils/sendRespone";
import { IUser } from "../user/user.interface";
import { AuthServices } from "./auth.service";
import { envVars } from "../../../config/env";
import { catchAsync } from "../../../utils/catchAysnc";

export const userLogin = async (req: Request, res: Response) => {
  const data = await AuthServices.loginUser(req.body);

  res.cookie("accessToken", data.accessToken, {
    httpOnly: true,
    secure:true,
    sameSite: "none",
  });

  res.cookie("refreshToken", data.refreshToken, {
    httpOnly: true,
    secure:true,
    sameSite:"none"
  });

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "User Login Successfully",
    data,
  });
};


const logout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "User Logged Out Successfully",
        data: null,
    })
})

export const AuthController = {
  userLogin,
  logout
};
