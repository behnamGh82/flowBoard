import { Router } from 'express'
import {
  authController,
  registerValidation,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
} from '../controllers/auth.controller'
import { authenticate } from '../middleware/auth.middleware'

const router = Router()

router.post('/register', registerValidation, authController.register)
router.post('/login', loginValidation, authController.login)
router.post('/forgot-password', forgotPasswordValidation, authController.forgotPassword)
router.post('/reset-password', resetPasswordValidation, authController.resetPassword)
router.get('/me', authenticate, authController.getMe)

export default router
