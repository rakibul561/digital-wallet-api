import express from 'express' 
import { TransactionController } from './transaction.controller'


const router = express.Router() 
 


router.post("/add-money", TransactionController.addMoney)




 export const TransactionRouters = router