 import express from "express"
import { AuthController } from "./auth.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { userZodSchema } from "../user/user.validation";


 const router = express.Router();

 router.post("/login", validateRequest(userZodSchema.userLoginZodSchema), AuthController.userLogin)
 router.post("/logOut" , AuthController.logout)

 export const AuthRouters =  router;