import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import  httpStatus  from 'http-status-codes';
import AppError from "../errorHelpers/AppError";
import { verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { User } from "../modules/user/user.model";
import { Status } from "../modules/user/user.interface";

;

export const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {

    try {
        const accessToken = req.headers.authorization;

        if (!accessToken) {
            throw new AppError(403, "No Token Recieved")
        }


        const verifiedToken = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET) as JwtPayload

        const isUserExist = await User.findOne({ email: verifiedToken.email })

        if (!isUserExist) {
            throw new AppError(httpStatus.BAD_REQUEST, "User does not exist")
        }
        if (isUserExist.status === Status.BLOCKED || isUserExist.status === Status.INACTIVE) {
            throw new AppError(httpStatus.BAD_REQUEST, `User is ${isUserExist.status}`)
        }
      

        if (!authRoles.includes(verifiedToken.role)) {
            throw new AppError(403, "You are not permitted to view this route!!!")
        }

        
        next()

    } catch (error) {
        console.log("jwt error", error);
        next(error)
    }
}