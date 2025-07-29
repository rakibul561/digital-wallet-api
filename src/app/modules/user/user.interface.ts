 
 export enum Role {
    ADMIN= "ADMIN",
    USER = "USER",
    AGENT = "AGENT"
 } 

 export enum Status {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BLOCKED = "BLOCKED"
 }


export interface IUser {
  name: string;
  email: string;
  password: string;
  phone?: string;
  image?:string;
  address?: string;
  role: Role;
  status?: Status;
}