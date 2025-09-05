import { envVars } from "../../../config/env";
import { IStatus, IType } from "../../../type";
import AppError from "../../errorHelpers/AppError";
import { Wallet } from "../wallet/wallet.model";
import { IUser, Status } from "./user.interface";
import { User } from "./user.model";
import  bcrypt  from 'bcrypt';

const createUserDb = async (payload: IUser) => {
 
  payload.password = await bcrypt.hash(payload.password, 10);

  
  const user = await User.create(payload);

  // wallet create
  const wallet = await Wallet.create({
    userId: user._id,
    balance: 50,
    status: "ACTIVE",
  });

  // return user + walletId
  return {
    ...user.toObject(),
    walletId: wallet._id,
  };
};

  


const getAllUsers = async () => {
    const users = await User.find({});
    const totalUsers = await User.countDocuments();
    return {
      meta: {
            total: totalUsers
        },
        data: users,
        
    }
};


const SingleUser = async (userId: string) => {
 
  const user = await User.findById(userId).select("-password").lean();

 
  const wallet = await Wallet.findOne({ userId });

  return {
    ...user,
    walletId: wallet?._id,
  };
};


const userUpdateProfile = async (userId:string , payload:IType) =>{

  const {name,phone,oldPassword,newPassword} = payload ;

  const user = await User.findById(userId)

  if(!user) {
    throw new Error("user not found")
  }

  if(name) user.name = name;
  if(phone) user.phone = phone;

  if(oldPassword && newPassword){
    const isMatch = await bcrypt.compare(oldPassword,user.password)
      if(!isMatch){
        throw new Error("old password is Incorect")
      }
      user.password = await bcrypt.hash(newPassword,10)
  }
   await user.save();

   return user;

}


const updateUserStatus = async (userId: string, status:Status) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  user.status = status; 
  await user.save();

  return user;
};



export const UserService = {
  createUserDb,
  getAllUsers,
  SingleUser,
  updateUserStatus,
  userUpdateProfile,
};
