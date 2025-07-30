import AppError from "../../errorHelpers/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import  bcrypt  from 'bcrypt';

 
 

 export const loginUser = async (payload:IUser) =>{
   
    const isUserExist = await User.findOne({email: payload.email})
    if(!isUserExist){
        throw new AppError(404, "User Not Found")
    } 
   const checkPassword = await bcrypt.compare(payload.password , isUserExist.password)

   if(!checkPassword){
    throw new AppError(403, "Password Does not exist")
   }
    return isUserExist
 } 

 

 export const AuthServices = {
    loginUser,
    

 }