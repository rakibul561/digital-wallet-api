 
 import express from "express" 
import { UserRouters } from "../modules/user/user.route";
import { AuthRouters } from "../modules/auth/auth.route";
import { WalletRouters } from "../modules/wallet/wallet.route";


 export const router = express.Router();


 const moduleRoutes = [
    {
        path:"/user",
        route: UserRouters
    },
    {
        path:"/auth",
        route: AuthRouters
    },
    {
        path:"/wallets",
        route: WalletRouters
    },

 ]
 
 
 moduleRoutes.forEach((route) =>{
  router.use (route.path, route.route)
 })