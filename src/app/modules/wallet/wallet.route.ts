
import express from 'express'
import { WalletController } from './wallet.controller'
import { checkAuth } from '../../middleware/checkAuth'
import { Role } from '../user/user.interface'


const router = express.Router()
router.get('/', checkAuth(Role.ADMIN), WalletController.getAllWallet)
router.get('/me/:walletId', WalletController.getSingleWallet)


export const WalletRouters = router