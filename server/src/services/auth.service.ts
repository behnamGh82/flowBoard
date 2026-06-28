import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { User } from '../models'
import { generateToken } from '../utils/helpers'
import { AppError } from '../middleware/error.middleware'
import { env } from '../config/env'
import type { AuthRequest, UserRole } from '../types'
import type { Response } from 'express'

const hashResetToken = (token: string) =>
  crypto.createHash('sha256').update(token).digest('hex')

export const authService = {
  register: async (
    name: string,
    email: string,
    password: string,
    role: UserRole = 'developer',
  ) => {
    const existing = await User.findOne({ email })
    if (existing) throw new AppError('Email already registered', 409)

    const user = await User.create({ name, email, password, role })
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

  forgotPassword: async (email: string) => {
    const user = await User.findOne({ email })

    if (!user) {
      return { message: 'If the email exists, reset instructions will be sent.' }
    }

    const resetToken = crypto.randomBytes(32).toString('hex')
    user.passwordResetToken = hashResetToken(resetToken)
    user.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000)
    await user.save()

    if (env.nodeEnv !== 'production') {
      return {
        message: 'If the email exists, reset instructions will be sent.',
        resetToken,
      }
    }

    return { message: 'If the email exists, reset instructions will be sent.' }
  },

  resetPassword: async (token: string, password: string) => {
    const hashedToken = hashResetToken(token)
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: new Date() },
    }).select('+passwordResetToken +passwordResetExpires +password')

    if (!user) {
      throw new AppError('Invalid or expired reset token', 400)
    }

    user.password = password
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save()

    return { message: 'Password reset successful' }
  },
}

export const sendSuccess = <T>(res: Response, data: T, statusCode = 200) => {
  res.status(statusCode).json({ success: true, data })
}
