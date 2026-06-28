import jwt from 'jsonwebtoken'
import { User } from '../models'
import { generateToken } from '../utils/helpers'
import { AppError } from '../middleware/error.middleware'
import type { AuthRequest } from '../types'
import type { Response } from 'express'

export const authService = {
  register: async (name: string, email: string, password: string) => {
    const existing = await User.findOne({ email })
    if (existing) throw new AppError('Email already registered', 409)

    const user = await User.create({ name, email, password })
    const token = generateToken({ id: user._id.toString(), email: user.email, role: user.role })

    return { user, tokens: { accessToken: token } }
  },

  login: async (email: string, password: string) => {
    const user = await User.findOne({ email }).select('+password')
    if (!user || !(await user.comparePassword(password))) {
      throw new AppError('Invalid email or password', 401)
    }

    const token = generateToken({ id: user._id.toString(), email: user.email, role: user.role })
    const { password: _password, ...userObject } = user.toObject()

    return { user: userObject, tokens: { accessToken: token } }
  },

  getMe: async (req: AuthRequest) => {
    const user = await User.findById(req.user!.id)
    if (!user) throw new AppError('User not found', 404)
    return user
  },
}

export const sendSuccess = <T>(res: Response, data: T, statusCode = 200) => {
  res.status(statusCode).json({ success: true, data })
}
