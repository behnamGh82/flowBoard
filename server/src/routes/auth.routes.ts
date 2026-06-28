import { Router } from 'express'
import {
  authController,
  registerValidation,
  loginValidation,
} from '../controllers/auth.controller'
import { authenticate } from '../middleware/auth.middleware'

const router = Router()

router.post('/register', registerValidation, authController.register)
router.post('/login', loginValidation, authController.login)
router.get('/me', authenticate, authController.getMe)

export default router
