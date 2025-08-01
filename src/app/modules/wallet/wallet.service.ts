import { catchAsync } from "../../../utils/catchAysnc";
import { IWallet } from "./wallet.interface";
import { Wallet } from "./wallet.model";

export const createWalletDB = async (payload: IWallet) => {
  console.log(payload);
  const { userId, balance} = payload
  const data = await Wallet.create({
     userId,
     balance
  });
  return data
}; 

 
  const getAllWalletsDB = async () =>{
  
    const wallets = await Wallet.find()


    return wallets
  } 


  const getSingleWalletsDB = async (payload: string) =>{
    
    const data = await Wallet.findById(payload)

    return data;

  }




export const WalletServices = {
  createWalletDB,
  getAllWalletsDB,
  getSingleWalletsDB
};
