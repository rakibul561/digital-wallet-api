import express from 'express' 
import { TransactionController } from './transaction.controller'
import { checkAuth } from '../../middleware/checkAuth'
import { Role } from '../user/user.interface'


const router = express.Router() 
 


router.post("/add-money",checkAuth(Role.USER),TransactionController.addMoney)
router.post("/withdraw",checkAuth(Role.USER),TransactionController.withdraw)
router.post("/send-money",checkAuth(Role.USER),TransactionController.sendMoney)
router.post("/cash-in",checkAuth(Role.AGENT),TransactionController.cashIn)
router.post("/cash-out",checkAuth(Role.AGENT),TransactionController.cashOut)

router.get("/me",checkAuth(Role.USER, Role.AGENT),TransactionController.getMyTransaction)
router.get("/",checkAuth(Role.ADMIN),TransactionController.getAllTransaction)




 export const TransactionRouters = router