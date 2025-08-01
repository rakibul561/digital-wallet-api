import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import httpStatus from 'http-status-codes';
import AppError from "../errorHelpers/AppError";
import { verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { User } from "../modules/user/user.model";
import { Status } from "../modules/user/user.interface";

export const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers.authorization;

        if (!accessToken) {
            throw new AppError(httpStatus.UNAUTHORIZED, "No Token Received");
        }

        
        const token = accessToken.startsWith('Bearer ') 
            ? accessToken.slice(7) 
            : accessToken;

        const verifiedToken = verifyToken(token, envVars.JWT_ACCESS_SECRET) as JwtPayload;

    

        const isUserExist = await User.findOne({ email: verifiedToken.email });

        if (!isUserExist) {
            throw new AppError(httpStatus.NOT_FOUND, "User does not exist");
        }

        if (isUserExist.status === Status.BLOCKED || isUserExist.status === Status.INACTIVE) {
            throw new AppError(httpStatus.FORBIDDEN, `User is ${isUserExist.status}`);
        }

       
        if (authRoles.length > 0 && !authRoles.includes(verifiedToken.role)) {
            throw new AppError(httpStatus.FORBIDDEN, "You are not permitted to access this route!");
        }

    
        (req as any).user = verifiedToken;

        next();

    } catch (error) {
        console.log("JWT error:", error);
        next(error);
    }
};
