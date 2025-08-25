import { envVars } from "../../../config/env";
import { Wallet } from "../wallet/wallet.model";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import  bcrypt  from 'bcrypt';

const createUserDb = async (payload: IUser) => {
  payload.password = await bcrypt.hash(payload.password, 10)
  const user = await User.create(payload);

  
  await Wallet.create({
    userId: user._id,
    balance: 50,
  });

  return user;
};
  

// get all user 
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
   const user = await User.findById(userId).select("-password");
    return {
        data: user
    }
};





export const UserService = {
  createUserDb,
  getAllUsers,
  SingleUser
};
