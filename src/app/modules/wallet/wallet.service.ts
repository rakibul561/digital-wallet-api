import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpers/AppError";
import { Role } from "../user/user.interface";
import { updateWallets } from "./wallet.controller";
import { IWallet } from "./wallet.interface";
import { Wallet } from "./wallet.model";
import httpStatus from "http-status-codes";

export const createWalletDB = async (payload: IWallet) => {
  console.log(payload);
  const { userId, balance } = payload;
  const data = await Wallet.create({
    userId,
    balance,
  });
  return data;
};


const getAllWalletsDB = async () => {
  const wallets = await Wallet.find({});

  return wallets;
};



const getSingleWalletsDB = async (payload: string) => {
  const data = await Wallet.findById(payload);
  return data;
};


export const walletUpdated = async (
  walletId: string,
  payload: any,
  userToken: JwtPayload
) => {
  const existingWallet = await Wallet.findById(walletId);
  if (!existingWallet) {
    throw new AppError(httpStatus.NOT_FOUND, "Wallet not found");
  }

  if (payload.status) {
    if (userToken.role !== Role.ADMIN) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "Only admins can change wallet status"
      );
    }
  }

  const updatedWallet = await Wallet.findByIdAndUpdate(walletId, payload, {
    new: true,
    runValidators: true,
  });

  return updatedWallet;
};

export const WalletServices = {
  createWalletDB,
  getAllWalletsDB,
  getSingleWalletsDB,
  walletUpdated,
};
