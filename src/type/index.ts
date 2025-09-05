import { ObjectId } from "mongoose";


export interface IType {
    name?:string,
    phone?:string,
    oldPassword?:string,
    newPassword?:string
 }


 export interface IStatus{
    status?:string
 }



 export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  userId: ObjectId;
};
