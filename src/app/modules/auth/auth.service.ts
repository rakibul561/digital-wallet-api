
import { email } from "zod";
import AppError from "../../errorHelpers/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import  bcrypt  from 'bcrypt';
import  Jwt  from "jsonwebtoken";
import { envVars } from "../../../config/env";
import { generateToken } from "../../../utils/jwt";
 
 

 export const loginUser = async (payload:IUser) =>{
   
    const isUserExist = await User.findOne({email: payload.email})
    if(!isUserExist){
        throw new AppError(404, "User Not Found")
    } 
   const checkPassword = await bcrypt.compare(payload.password , isUserExist.password)

   if(!checkPassword){
    throw new AppError(403, "Password Does not exist")
   } 


   const jwtPayload = {
     email:payload.email,
     role: isUserExist.role
   }
    
     const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES)

   

    return accessToken
 } 

 

 export const AuthServices = {
    loginUser,
    

 }