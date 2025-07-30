import { NextFunction, Request, Response } from "express";

 

   export const globalErrorHandaler = (err:any, req:Request, res:Response, next:NextFunction) =>{
      
    const statusCode = 500
    const message = `Something Went Wrong!! ${err.message}` 

     res.status(statusCode).json({
        success: false,
        message ,
        err
     })
     

   }