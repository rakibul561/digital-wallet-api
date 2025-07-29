import { IUser } from "./user.interface";
import { User } from "./user.model";

 


   const createUserDb =  async (payload:IUser) =>{
    const data = await User.create(payload)


    return data;

   } 


export const UserService = {
    createUserDb
}