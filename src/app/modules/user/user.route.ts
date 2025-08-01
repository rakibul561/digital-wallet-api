 import express from 'express'
import { UserController } from './user.controller'
import { validateRequest } from '../../middleware/validateRequest'
import { userZodSchema } from './user.validation'
import { checkAuth } from '../../middleware/checkAuth'
import { Role } from './user.interface'

  const router = express.Router()
   
  router.post("/register", validateRequest(userZodSchema.userCreateZodSchema), UserController.createUser)
  router.get("/", checkAuth(Role.ADMIN), UserController.getAllUsers)


  export const  UserRouters = router