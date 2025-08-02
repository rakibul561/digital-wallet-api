import express from 'express' 
import { TransactionController } from './transaction.controller'
import { checkAuth } from '../../middleware/checkAuth'
import { Role } from '../user/user.interface'


const router = express.Router() 
 


router.post("/add-money",checkAuth(Role.USER),TransactionController.addMoney)
router.post("/withdraw",checkAuth(Role.USER),TransactionController.withdraw)
router.post("/send-money",checkAuth(Role.USER),TransactionController.sendMoney)




 export const TransactionRouters = router