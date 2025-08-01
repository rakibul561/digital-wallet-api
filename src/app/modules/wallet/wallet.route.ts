
import express from 'express'
import { WalletController } from './wallet.controller'
import { checkAuth } from '../../middleware/checkAuth'
import { Role } from '../user/user.interface'


const router = express.Router()
router.get('/', checkAuth(Role.ADMIN), WalletController.getAllWallet)
router.get('/me/:walletId', WalletController.getSingleWallet)
router.patch('/block/:walletId', checkAuth(Role.ADMIN), WalletController.updateWallets)


export const WalletRouters = router