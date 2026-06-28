import { Response, NextFunction } from 'express'
import { body, validationResult } from 'express-validator'
import { authService, sendSuccess } from '../services/auth.service'
import type { AuthRequest } from '../types'

export const registerValidation = [
  body('name').trim().isLength({ min: 2 }),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
]

export const loginValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty(),
]

export const authController = {
  register: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: errors.array()[0].msg })
      }
      const result = await authService.register(req.body.name, req.body.email, req.body.password)
      sendSuccess(res, result, 201)
    } catch (error) {
      next(error)
    }
  },

  login: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: 'Invalid credentials' })
      }
      const result = await authService.login(req.body.email, req.body.password)
      sendSuccess(res, result)
    } catch (error) {
      next(error)
    }
  },

  getMe: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const user = await authService.getMe(req)
      sendSuccess(res, user)
    } catch (error) {
      next(error)
    }
  },
}
