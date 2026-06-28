import jwt from 'jsonwebtoken'
import { env } from '../config/env'

interface TokenPayload {
  id: string
  email: string
  role: string
}

export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn } as jwt.SignOptions)
}

export const paginate = (page = 1, limit = 20) => {
  const safePage = Math.max(1, page)
  const safeLimit = Math.min(100, Math.max(1, limit))
  const skip = (safePage - 1) * safeLimit
  return { page: safePage, limit: safeLimit, skip }
}

export const paginatedResponse = <T>(
  data: T[],
  total: number,
  page: number,
  limit: number,
) => ({
  data,
  total,
  page,
  limit,
  totalPages: Math.ceil(total / limit),
})
