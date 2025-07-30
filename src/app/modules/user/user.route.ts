 import express from 'express'
import { UserController } from './user.controller'
import { validateRequest } from '../../middleware/validateRequest'
import { userZodSchema } from './user.validation'

  const router = express.Router()
   
  router.post("/register", validateRequest(userZodSchema.userCreateZodSchema), UserController.createUser)
  router.get("/all-users",  UserController.getAllUsers)


  export const  UserRouters = router