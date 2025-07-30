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

export const WalletServices = {
  createWalletDB,
};
